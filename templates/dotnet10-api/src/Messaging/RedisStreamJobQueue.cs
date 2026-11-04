using System.Text.Json;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;

namespace Messaging;

public sealed class RedisStreamJobQueue : IJobQueue, IProcessedJobs
{
    public const string StreamKey = "jobs:email";
    public const string Group = "workers";
    public const string Consumer = "worker-1";
    public const string ProcessedSet = "jobs:email:processed";

    private readonly IDatabase _db;
    private readonly ILogger<RedisStreamJobQueue> _logger;

    public string Backend => "redis";

    public RedisStreamJobQueue(IConnectionMultiplexer redis, ILogger<RedisStreamJobQueue> logger)
    {
        _db = redis.GetDatabase();
        _logger = logger;
        try
        {
            _db.StreamCreateConsumerGroup(StreamKey, Group, "$", createStream: true);
        }
        catch (RedisServerException ex) when (ex.Message.Contains("BUSYGROUP"))
        {
            // grupo ya existe
        }
    }

    public async Task EnqueueAsync(EmailJob job, CancellationToken cancellationToken = default)
    {
        await _db.StreamAddAsync(StreamKey, new NameValueEntry[]
        {
            new("jobId", job.JobId),
            new("correlationId", job.CorrelationId),
            new("type", "send_welcome_email"),
            new("payload", JsonSerializer.Serialize(job))
        });
        _logger.LogInformation("Redis XADD jobId={JobId} correlationId={CorrelationId}", job.JobId, job.CorrelationId);
    }

    public async Task<EmailJob?> DequeueAsync(CancellationToken cancellationToken = default)
    {
        var entries = await _db.StreamReadGroupAsync(StreamKey, Group, Consumer, ">", count: 1);
        if (entries.Length == 0)
        {
            return null;
        }

        var entry = entries[0];
        var map = entry.Values.ToDictionary(v => v.Name.ToString(), v => v.Value.ToString());
        var payload = map.GetValueOrDefault("payload");
        if (!string.IsNullOrWhiteSpace(payload))
        {
            return JsonSerializer.Deserialize<EmailJob>(payload);
        }

        return new EmailJob(
            map.GetValueOrDefault("jobId") ?? Guid.NewGuid().ToString(),
            map.GetValueOrDefault("correlationId") ?? Guid.NewGuid().ToString(),
            0);
    }

    public async Task AckAsync(EmailJob job, CancellationToken cancellationToken = default)
    {
        await _db.StreamAcknowledgeAsync(StreamKey, Group, job.JobId);
    }

    public async Task<bool> WasProcessedAsync(string jobId, CancellationToken cancellationToken = default)
        => await _db.SetContainsAsync(ProcessedSet, jobId);

    public async Task MarkProcessedAsync(string jobId, CancellationToken cancellationToken = default)
    {
        await _db.SetAddAsync(ProcessedSet, jobId);
    }
}
