using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Agent;
using Application;
using Domain;
using Infrastructure;
using Messaging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext con SQLite para soporte de Migraciones EF Core
builder.Services.AddDbContext<AppDb>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=bootcamp.db";
    options.UseSqlite(connectionString);
});

// Configuración de JWT / OIDC Bearer Authentication
var secretKey = builder.Configuration["Jwt:SecretKey"] ?? "SuperSecretKeyForBootcamp2026!WithMinimum32BytesLength";
var keyBytes = Encoding.UTF8.GetBytes(secretKey);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsAdmin", policy => policy.RequireRole("Admin"));
});

builder.Services.AddScoped<UsersPlugin>();
builder.Services.AddScoped<IAgentRunner, SemanticKernelAgentRunner>();

builder.Services.AddSingleton<InMemoryJobRuntime>();
builder.Services.AddSingleton<IJobStatusStore>(sp => sp.GetRequiredService<InMemoryJobRuntime>());
builder.Services.AddSingleton<JobProcessor>();

var redisConnection = builder.Configuration["REDIS_CONNECTION"]
    ?? Environment.GetEnvironmentVariable("REDIS_CONNECTION");
var azureConnection = builder.Configuration["AZURE_STORAGE_CONNECTION_STRING"]
    ?? Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
var jobBackend = (Environment.GetEnvironmentVariable("JOB_BACKEND") ?? "memory").ToLowerInvariant();

if (jobBackend == "redis" && !string.IsNullOrWhiteSpace(redisConnection))
{
    builder.Services.AddSingleton<StackExchange.Redis.IConnectionMultiplexer>(
        _ => StackExchange.Redis.ConnectionMultiplexer.Connect(redisConnection));
    builder.Services.AddSingleton<RedisStreamJobQueue>();
    builder.Services.AddSingleton<IJobQueue>(sp => sp.GetRequiredService<RedisStreamJobQueue>());
    builder.Services.AddSingleton<IProcessedJobs>(sp => sp.GetRequiredService<RedisStreamJobQueue>());
}
else if (jobBackend == "azure" && !string.IsNullOrWhiteSpace(azureConnection))
{
    builder.Services.AddSingleton<IJobQueue>(sp =>
        new AzureQueueJobQueue(azureConnection, sp.GetRequiredService<ILogger<AzureQueueJobQueue>>()));
    builder.Services.AddSingleton<IProcessedJobs>(sp => sp.GetRequiredService<InMemoryJobRuntime>());
}
else
{
    builder.Services.AddSingleton<IJobQueue>(sp => sp.GetRequiredService<InMemoryJobRuntime>());
    builder.Services.AddSingleton<IProcessedJobs>(sp => sp.GetRequiredService<InMemoryJobRuntime>());
}

builder.Services.AddHostedService<JobWorker>();

var app = builder.Build();

// Inicializar y garantizar la creación del esquema en SQLite
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDb>();
    db.Database.EnsureCreated();
    await Seed.InitAsync(db);
}

app.UseAuthentication();
app.UseAuthorization();

// Endpoints Públicos
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapGet("/", () => "Bootcamp .NET API Operativa");

// Endpoints de CRUD de Usuarios
app.MapGet("/api/users", async (AppDb db) =>
    Results.Ok(await db.Users.ToListAsync()));

app.MapPost("/api/users", async (AppDb db, User user) =>
{
    if (string.IsNullOrWhiteSpace(user.Username))
    {
        return Results.BadRequest(new { error = "Username cannot be empty" });
    }

    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/api/users/{user.Id}", user);
});

app.MapGet("/api/users/{id:int}", async (AppDb db, int id) =>
{
    var user = await db.Users.FindAsync(id);
    return user is not null ? Results.Ok(user) : Results.NotFound(new { error = "User not found" });
});

// Endpoint para generar JWT Token de prueba
app.MapPost("/api/auth/token", (User user) =>
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.Username ?? "testuser"),
            new Claim(ClaimTypes.Role, user.Role ?? "User")
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return Results.Ok(new { token = tokenHandler.WriteToken(token) });
});

// Endpoint Protegido Autenticado (401 vs 200)
app.MapGet("/api/protected", [Authorize] () =>
    Results.Ok(new { message = "Acceso autorizado con JWT exitoso", timestamp = DateTime.UtcNow }));

// Endpoint Protegido con Rol Admin (403 vs 200)
app.MapGet("/api/admin", [Authorize(Policy = "IsAdmin")] () =>
    Results.Ok(new { message = "Acceso concedido a zona Admin", role = "Admin" }));

app.MapPost("/agent/report", async (AgentRequest request, IAgentRunner agent, ILogger<Program> logger) =>
{
    try
    {
        var result = await agent.RunAsync(request.Prompt);
        logger.LogInformation("Agent report generated with {ToolCount} tool invocations", result.Tools.Count);
        return Results.Ok(new { report = result.Report, tools = result.Tools });
    }
    catch (PromptRejectedException ex)
    {
        return Results.BadRequest(new { error = ex.Message });
    }
});

app.MapPost("/jobs/email", async (EnqueueEmailRequest request, IJobQueue queue, ILoggerFactory logs) =>
{
    var logger = logs.CreateLogger("Jobs");
    var job = new EmailJob(Guid.NewGuid().ToString(), Guid.NewGuid().ToString("N"), request.UserId);
    await queue.EnqueueAsync(job);
    logger.LogInformation(
        "Producer enqueued jobId={JobId} correlationId={CorrelationId} backend={Backend}",
        job.JobId,
        job.CorrelationId,
        queue.Backend);
    return Results.Accepted($"/jobs/{job.JobId}", new
    {
        jobId = job.JobId,
        correlationId = job.CorrelationId,
        backend = queue.Backend
    });
});

app.MapGet("/jobs/{jobId}", async (string jobId, IJobStatusStore statuses) =>
{
    var status = await statuses.GetAsync(jobId);
    return status is null ? Results.NotFound() : Results.Ok(status);
});

app.Run();

// Parcial para soporte de WebApplicationFactory en Pruebas Unitarias
public partial class Program { }