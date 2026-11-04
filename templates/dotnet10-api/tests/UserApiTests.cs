using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Api.Tests;

public class UserApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public UserApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Health_Returns_Ok()
    {
        var response = await _client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task CreateUser_Success()
    {
        var user = new User { Username = "dotnetdev", Email = "dev@dotnet.org", Role = "User" };
        var response = await _client.PostAsJsonAsync("/api/users", user);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var created = await response.Content.ReadFromJsonAsync<User>();
        Assert.NotNull(created);
        Assert.Equal("dotnetdev", created.Username);
    }

    [Fact]
    public async Task CreateUser_EmptyUsername_ReturnsBadRequest()
    {
        var user = new User { Username = "   ", Email = "bad@dotnet.org" };
        var response = await _client.PostAsJsonAsync("/api/users", user);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task ProtectedEndpoint_WithoutToken_ReturnsUnauthorized_401()
    {
        var response = await _client.GetAsync("/api/protected");
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task AdminEndpoint_WithoutAdminRole_ReturnsForbidden_403()
    {
        // 1. Obtener token con rol 'User' normal
        var tokenRes = await _client.PostAsJsonAsync("/api/auth/token", new User { Username = "normal_user", Role = "User" });
        var tokenDoc = await tokenRes.Content.ReadFromJsonAsync<JsonElement>();
        var token = tokenDoc.GetProperty("token").GetString();

        // 2. Intentar acceder a /api/admin
        var request = new HttpRequestMessage(HttpMethod.Get, "/api/admin");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _client.SendAsync(request);
        Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
    }

    [Fact]
    public async Task AdminEndpoint_WithAdminRole_ReturnsOk_200()
    {
        // 1. Obtener token con rol 'Admin'
        var tokenRes = await _client.PostAsJsonAsync("/api/auth/token", new User { Username = "admin_user", Role = "Admin" });
        var tokenDoc = await tokenRes.Content.ReadFromJsonAsync<JsonElement>();
        var token = tokenDoc.GetProperty("token").GetString();

        // 2. Acceder a /api/admin
        var request = new HttpRequestMessage(HttpMethod.Get, "/api/admin");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _client.SendAsync(request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
