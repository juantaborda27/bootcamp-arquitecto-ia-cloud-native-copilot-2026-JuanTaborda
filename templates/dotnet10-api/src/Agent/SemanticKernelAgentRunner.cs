using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

namespace Agent;

public sealed class SemanticKernelAgentRunner(
    UsersPlugin usersPlugin,
    ILogger<SemanticKernelAgentRunner> logger) : IAgentRunner
{
    public async Task<AgentRunResult> RunAsync(string prompt, CancellationToken cancellationToken = default)
    {
        var sanitized = PromptGuard.Sanitize(prompt);
        var audit = new ToolAuditCollector(logger);
        var kernel = BuildKernel(audit);

        var chat = kernel.GetRequiredService<IChatCompletionService>();
        var history = new ChatHistory(
            "You are an enrollment operations agent. Use only the Users plugin tools. Do not invent users.");
        history.AddUserMessage(sanitized);

        var settings = new OpenAIPromptExecutionSettings
        {
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto(autoInvoke: false)
        };

        var report = string.Empty;
        for (var step = 0; step < 4; step++)
        {
            var message = await chat.GetChatMessageContentAsync(history, settings, kernel, cancellationToken);
            history.Add(message);

            var calls = message.Items.OfType<FunctionCallContent>().ToList();
            if (calls.Count == 0)
            {
                report = message.Content ?? string.Empty;
                break;
            }

            foreach (var call in calls)
            {
                var toolResult = await call.InvokeAsync(kernel, cancellationToken);
                history.Add(toolResult.ToChatMessage());
            }
        }

        return new AgentRunResult(report, audit.Snapshot());
    }

    private Kernel BuildKernel(ToolAuditCollector audit)
    {
        var builder = Kernel.CreateBuilder();
        var deployment = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT");
        var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
        var apiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_KEY")
            ?? Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY");

        if (!string.IsNullOrWhiteSpace(deployment)
            && !string.IsNullOrWhiteSpace(endpoint)
            && !string.IsNullOrWhiteSpace(apiKey))
        {
            builder.AddAzureOpenAIChatCompletion(deployment, endpoint, apiKey);
            logger.LogInformation("Semantic Kernel using Azure OpenAI deployment {Deployment}", deployment);
        }
        else
        {
            builder.Services.AddSingleton<IChatCompletionService, ScriptedChatCompletionService>();
            logger.LogWarning("Azure OpenAI env vars missing; using scripted chat completion with real Users plugin");
        }

        builder.Services.AddSingleton<IFunctionInvocationFilter>(audit);
        var kernel = builder.Build();
        kernel.Plugins.AddFromObject(usersPlugin, "Users");
        return kernel;
    }
}
