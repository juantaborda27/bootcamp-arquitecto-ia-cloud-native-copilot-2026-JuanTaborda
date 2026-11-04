using Microsoft.Extensions.Logging;

namespace Messaging;

public sealed class JobProcessor
{
    public const int MaxAttempts = 2;

    public Task ProcessAsync(EmailJob job, ILogger logger, CancellationToken cancellationToken = default)
    {
        logger.LogInformation(
            "Processing welcome email jobId={JobId} correlationId={CorrelationId} userId={UserId} attempt={Attempt}",
            job.JobId,
            job.CorrelationId,
            job.UserId,
            job.Attempt);

        if (job.UserId < 0 && job.Attempt < MaxAttempts)
        {
            throw new InvalidOperationException("Simulated transient failure");
        }

        return Task.CompletedTask;
    }
}
