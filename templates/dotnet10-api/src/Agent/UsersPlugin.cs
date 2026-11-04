using System.ComponentModel;
using System.Text.Json;
using Domain;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.SemanticKernel;

namespace Agent;

public sealed class UsersPlugin(AppDb db)
{
    private static readonly JsonSerializerOptions JsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    [KernelFunction("get_active_users")]
    [Description("Returns currently active users from the enrollment system database")]
    public async Task<string> GetActiveUsers()
    {
        var users = await db.Users
            .AsNoTracking()
            .Where(user => user.Status == "ACTIVE")
            .Select(user => new { user.Id, user.Username, user.Email, user.Role, user.Status })
            .ToListAsync();

        return JsonSerializer.Serialize(users, JsonOptions);
    }

    [KernelFunction("summarize_users")]
    [Description("Summarizes user statistics: total, active and inactive counts from a JSON user list")]
    public string SummarizeUsers([Description("JSON list of users")] string usersJson)
    {
        var users = JsonSerializer.Deserialize<List<User>>(usersJson, JsonOptions) ?? [];
        var active = users.Count(user => string.Equals(user.Status, "ACTIVE", StringComparison.OrdinalIgnoreCase));
        return $"Total: {users.Count}, Active: {active}, Inactive: {users.Count - active}";
    }

    [KernelFunction("format_report")]
    [Description("Formats a final operator-facing report from a summary sentence")]
    public string FormatReport([Description("Summary text to format")] string summary)
    {
        if (string.IsNullOrWhiteSpace(summary))
        {
            throw new ArgumentException("Summary is required", nameof(summary));
        }

        return $"# Active users report{Environment.NewLine}{summary.Trim()}{Environment.NewLine}Source: UsersPlugin / AppDb";
    }
}
