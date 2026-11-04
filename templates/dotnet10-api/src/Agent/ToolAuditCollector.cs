using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;

namespace Agent;

public sealed class ToolAuditCollector : IFunctionInvocationFilter
{
    private readonly ConcurrentQueue<ToolInvocationLog> _invocations = new();
    private readonly ILogger _logger;

    public ToolAuditCollector(ILogger logger)
    {
        _logger = logger;
    }

    public IReadOnlyList<ToolInvocationLog> Snapshot() => _invocations.ToArray();

    public async Task OnFunctionInvocationAsync(
        FunctionInvocationContext context,
        Func<FunctionInvocationContext, Task> next)
    {
        var input = context.Arguments is null
            ? "{}"
            : string.Join(", ", context.Arguments.Select(pair => $"{pair.Key}={pair.Value}"));

        await next(context);

        var output = context.Result?.GetValue<object>()?.ToString() ?? string.Empty;
        var truncated = output.Length > 2000 ? output[..2000] + "…" : output;
        var log = new ToolInvocationLog(context.Function.Name, input, truncated);
        _invocations.Enqueue(log);
        _logger.LogInformation(
            "Agent tool invoked: {Tool} input={Input} output={Output}",
            log.Name,
            log.Input,
            log.Output);
    }
}
