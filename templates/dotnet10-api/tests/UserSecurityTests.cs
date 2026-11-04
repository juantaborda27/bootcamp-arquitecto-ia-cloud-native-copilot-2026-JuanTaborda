using System.Security.Claims;
using Application;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Xunit;

namespace Api.Tests;

public sealed class UserSecurityTests
{
    [Fact]
    public void PasswordIsHashedAndValidPasswordCanBeVerified()
    {
        var user = new User { Email = "test@example.com", FullName = "Test User" };
        var hasher = new PasswordHasher<User>();

        user.PasswordHash = hasher.HashPassword(user, "ValidPassword123!");

        Assert.NotEqual("ValidPassword123!", user.PasswordHash);
        Assert.Equal(PasswordVerificationResult.Success,
            hasher.VerifyHashedPassword(user, user.PasswordHash, "ValidPassword123!"));
    }

    [Fact]
    public void InvalidPasswordIsRejected()
    {
        var user = new User { Email = "test@example.com", FullName = "Test User" };
        var hasher = new PasswordHasher<User>();
        user.PasswordHash = hasher.HashPassword(user, "ValidPassword123!");

        Assert.Equal(PasswordVerificationResult.Failed,
            hasher.VerifyHashedPassword(user, user.PasswordHash, "wrong-password"));
    }

    [Fact]
    public void JwtAuthenticationUsesConfiguredIssuerAudienceAndSigningKey()
    {
        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Issuer"] = "test-issuer",
                ["Jwt:Audience"] = "test-audience",
                ["Jwt:Key"] = "test-key-with-at-least-32-characters-long"
            })
            .Build();
        var services = new ServiceCollection();
        services.AddJwtAuth(configuration);
        using var provider = services.BuildServiceProvider();

        var options = provider.GetRequiredService<IOptionsMonitor<JwtBearerOptions>>().Get(JwtBearerDefaults.AuthenticationScheme);

        Assert.Equal("test-issuer", options.TokenValidationParameters.ValidIssuer);
        Assert.Equal("test-audience", options.TokenValidationParameters.ValidAudience);
        Assert.True(options.TokenValidationParameters.ValidateIssuerSigningKey);
    }
}
