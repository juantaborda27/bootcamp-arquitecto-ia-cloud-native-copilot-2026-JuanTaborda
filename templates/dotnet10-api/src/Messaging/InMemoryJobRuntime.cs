using System.Collections.Concurrent;
using System.Threading.Channels;

namespace Messaging;

public sealed class InMemoryJobRuntime : IJobQueue, IProcessedJobs, IJobStatusStore
{
    private readonly Channel<EmailJob> _channel = Channel.CreateUnbounded<EmailJob>();
    private readonly ConcurrentDictionary<string, byte> _processed = new();
    private readonly ConcurrentDictionary<string, JobStatus> _status = new();

    public string Backend => "memory";

    public async Task EnqueueAsync(EmailJob job, CancellationToken cancellationToken = default)
    {
        await _channel.Writer.WriteAsync(job, cancellationToken);
        if (!_status.ContainsKey(job.JobId))
        {
            _status[job.JobId] = new JobStatus(job.JobId, "queued", Backend);
        }
    }

    public async Task<EmailJob?> DequeueAsync(CancellationToken cancellationToken = default)
    {
        if (await _channel.Reader.WaitToReadAsync(cancellationToken) && _channel.Reader.TryRead(out var job))
        {
            return job;
        }
        return null;
    }

    public Task AckAsync(EmailJob job, CancellationToken cancellationToken = default) => Task.CompletedTask;

    public Task<bool> WasProcessedAsync(string jobId, CancellationToken cancellationToken = default)
        => Task.FromResult(_processed.ContainsKey(jobId));

    public Task MarkProcessedAsync(string jobId, CancellationToken cancellationToken = default)
    {
        _processed.TryAdd(jobId, 1);
        return Task.CompletedTask;
    }

    public Task SetAsync(JobStatus status, CancellationToken cancellationToken = default)
    {
        _status[status.JobId] = status;
        return Task.CompletedTask;
    }

    public Task<JobStatus?> GetAsync(string jobId, CancellationToken cancellationToken = default)
        => Task.FromResult(_status.TryGetValue(jobId, out var status) ? status : null);
}
