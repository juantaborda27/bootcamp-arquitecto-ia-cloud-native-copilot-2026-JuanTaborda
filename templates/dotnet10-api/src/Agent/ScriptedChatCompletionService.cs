using System.Runtime.CompilerServices;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

namespace Agent;

/// <summary>
/// Chat completion de laboratorio: dispara tool calling de SK contra plugins reales
/// cuando Azure OpenAI no está configurado. No inventa usuarios; solo pide get_active_users.
/// </summary>
public sealed class ScriptedChatCompletionService : IChatCompletionService
{
    public IReadOnlyDictionary<string, object?> Attributes { get; } = new Dictionary<string, object?>();

    public Task<IReadOnlyList<ChatMessageContent>> GetChatMessageContentsAsync(
        ChatHistory chatHistory,
        PromptExecutionSettings? executionSettings = null,
        Kernel? kernel = null,
        CancellationToken cancellationToken = default)
    {
        var hasToolResult = chatHistory.Any(message =>
            message.Role == AuthorRole.Tool ||
            message.Items.OfType<FunctionResultContent>().Any());

        if (hasToolResult)
        {
            var fromResults = chatHistory
                .SelectMany(message => message.Items.OfType<FunctionResultContent>())
                .Select(item => item.Result?.ToString() ?? string.Empty);

            var fromToolMessages = chatHistory
                .Where(message => message.Role == AuthorRole.Tool)
                .Select(message => message.Content ?? string.Empty);

            var payload = string.Join(
                Environment.NewLine,
                fromResults.Concat(fromToolMessages).Where(text => !string.IsNullOrWhiteSpace(text)));

            if (string.IsNullOrWhiteSpace(payload))
            {
                payload = chatHistory.Last().Content ?? string.Empty;
            }

            IReadOnlyList<ChatMessageContent> final =
            [
                new ChatMessageContent(
                    AuthorRole.Assistant,
                    $"Active users report based on system data:{Environment.NewLine}{payload}")
            ];
            return Task.FromResult(final);
        }

        var call = new FunctionCallContent(
            functionName: "get_active_users",
            pluginName: "Users",
            id: "call_get_active_users",
            arguments: new KernelArguments());

        IReadOnlyList<ChatMessageContent> withTool =
        [
            new ChatMessageContent(AuthorRole.Assistant, [call])
        ];
        return Task.FromResult(withTool);
    }

    public async IAsyncEnumerable<StreamingChatMessageContent> GetStreamingChatMessageContentsAsync(
        ChatHistory chatHistory,
        PromptExecutionSettings? executionSettings = null,
        Kernel? kernel = null,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        var messages = await GetChatMessageContentsAsync(chatHistory, executionSettings, kernel, cancellationToken);
        foreach (var message in messages)
        {
            yield return new StreamingChatMessageContent(message.Role, message.Content);
        }
    }
}
