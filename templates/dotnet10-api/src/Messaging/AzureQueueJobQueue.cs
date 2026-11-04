using System.Text;
using System.Text.Json;
using Azure.Storage.Queues;
using Microsoft.Extensions.Logging;

namespace Messaging;

public sealed class AzureQueueJobQueue : IJobQueue
{
    private readonly QueueClient _client;
    private readonly ILogger<AzureQueueJobQueue> _logger;
    private string? _lastMessageId;
    private string? _lastPopReceipt;

    public string Backend => "azure-queue";

    public AzureQueueJobQueue(string connectionString, ILogger<AzureQueueJobQueue> logger)
    {
        _logger = logger;
        _client = new QueueClient(connectionString, "jobs-email");
        _client.CreateIfNotExists();
    }

    public async Task EnqueueAsync(EmailJob job, CancellationToken cancellationToken = default)
    {
        var json = JsonSerializer.Serialize(job);
        var encoded = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));
        await _client.SendMessageAsync(encoded, cancellationToken);
        _logger.LogInformation("Azure Queue send jobId={JobId} correlationId={CorrelationId}", job.JobId, job.CorrelationId);
    }

    public async Task<EmailJob?> DequeueAsync(CancellationToken cancellationToken = default)
    {
        var response = await _client.ReceiveMessagesAsync(maxMessages: 1, cancellationToken: cancellationToken);
        var message = response.Value.FirstOrDefault();
        if (message is null)
        {
            return null;
        }

        _lastMessageId = message.MessageId;
        _lastPopReceipt = message.PopReceipt;
        var json = Encoding.UTF8.GetString(Convert.FromBase64String(message.MessageText));
        return JsonSerializer.Deserialize<EmailJob>(json);
    }

    public async Task AckAsync(EmailJob job, CancellationToken cancellationToken = default)
    {
        if (_lastMessageId is null || _lastPopReceipt is null)
        {
            return;
        }

        await _client.DeleteMessageAsync(_lastMessageId, _lastPopReceipt, cancellationToken);
        _lastMessageId = null;
        _lastPopReceipt = null;
    }
}
