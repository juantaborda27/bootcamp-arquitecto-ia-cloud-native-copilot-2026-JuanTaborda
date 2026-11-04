namespace Agent;

public interface IAgentRunner
{
    Task<AgentRunResult> RunAsync(string prompt, CancellationToken cancellationToken = default);
}
