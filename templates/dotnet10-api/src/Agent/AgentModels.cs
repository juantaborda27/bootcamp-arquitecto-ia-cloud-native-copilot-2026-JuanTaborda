namespace Agent;

public sealed record AgentRequest(string Prompt);

public sealed record ToolInvocationLog(string Name, string Input, string Output);

public sealed record AgentRunResult(string Report, IReadOnlyList<ToolInvocationLog> Tools);

public sealed class PromptRejectedException : Exception
{
    public PromptRejectedException(string message) : base(message) { }
}
