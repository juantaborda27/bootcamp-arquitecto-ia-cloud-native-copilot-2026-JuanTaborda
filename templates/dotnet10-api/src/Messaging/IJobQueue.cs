namespace Messaging;

public interface IJobQueue
{
    string Backend { get; }
    Task EnqueueAsync(EmailJob job, CancellationToken cancellationToken = default);
    Task<EmailJob?> DequeueAsync(CancellationToken cancellationToken = default);
    Task AckAsync(EmailJob job, CancellationToken cancellationToken = default);
}

public interface IProcessedJobs
{
    Task<bool> WasProcessedAsync(string jobId, CancellationToken cancellationToken = default);
    Task MarkProcessedAsync(string jobId, CancellationToken cancellationToken = default);
}

public interface IJobStatusStore
{
    Task SetAsync(JobStatus status, CancellationToken cancellationToken = default);
    Task<JobStatus?> GetAsync(string jobId, CancellationToken cancellationToken = default);
}
