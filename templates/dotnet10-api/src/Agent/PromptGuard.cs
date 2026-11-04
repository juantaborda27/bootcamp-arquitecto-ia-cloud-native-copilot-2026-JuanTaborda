using System.Text.RegularExpressions;

namespace Agent;

public static class PromptGuard
{
    public const int MaxLength = 2000;

    private static readonly string[] BlockedFragments =
    [
        "ignore previous",
        "ignore all previous",
        "disregard previous",
        "system prompt",
        "developer mode"
    ];

    public static string Sanitize(string? prompt)
    {
        if (string.IsNullOrWhiteSpace(prompt))
        {
            throw new PromptRejectedException("Prompt is required");
        }

        var normalized = Regex.Replace(prompt.Trim(), @"[\p{C}-[\r\n\t]]", string.Empty);
        if (normalized.Length > MaxLength)
        {
            throw new PromptRejectedException("Prompt exceeds maximum length");
        }

        foreach (var fragment in BlockedFragments)
        {
            if (normalized.Contains(fragment, StringComparison.OrdinalIgnoreCase))
            {
                throw new PromptRejectedException("Prompt rejected by safety policy");
            }
        }

        return normalized;
    }
}
