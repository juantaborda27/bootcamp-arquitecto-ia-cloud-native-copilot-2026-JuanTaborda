using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Xunit;

namespace Api.Tests;

public class JobApiTests : IClassFixture<Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public JobApiTests(Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task EnqueueEmail_Returns202AndCompletes()
    {
        var response = await _client.PostAsJsonAsync("/jobs/email", new { userId = 101 });
        Assert.Equal(HttpStatusCode.Accepted, response.StatusCode);

        var body = await response.Content.ReadFromJsonAsync<JsonElement>();
        var jobId = body.GetProperty("jobId").GetString();
        Assert.False(string.IsNullOrWhiteSpace(jobId));
        Assert.Equal("memory", body.GetProperty("backend").GetString());

        JsonElement? status = null;
        for (var i = 0; i < 40; i++)
        {
            var poll = await _client.GetAsync($"/jobs/{jobId}");
            if (poll.StatusCode == HttpStatusCode.OK)
            {
                var doc = await poll.Content.ReadFromJsonAsync<JsonElement>();
                if (doc.GetProperty("state").GetString() == "completed")
                {
                    status = doc;
                    break;
                }
            }
            await Task.Delay(50);
        }

        Assert.True(status.HasValue);
        Assert.Equal("completed", status.Value.GetProperty("state").GetString());
    }
}
