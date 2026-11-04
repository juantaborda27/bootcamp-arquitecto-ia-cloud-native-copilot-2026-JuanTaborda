using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Messaging;

public sealed class JobWorker(
    IJobQueue queue,
    IProcessedJobs processed,
    IJobStatusStore statuses,
    JobProcessor processor,
    ILogger<JobWorker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Job worker started backend={Backend}", queue.Backend);
        while (!stoppingToken.IsCancellationRequested)
        {
            EmailJob? job = null;
            try
            {
                job = await queue.DequeueAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Dequeue failed");
            }

            if (job is null)
            {
                await Task.Delay(50, stoppingToken);
                continue;
            }

            await HandleAsync(job, stoppingToken);
        }
    }

    public async Task HandleAsync(EmailJob job, CancellationToken cancellationToken)
    {
        logger.LogInformation("Consumed jobId={JobId} correlationId={CorrelationId}", job.JobId, job.CorrelationId);
        if (await processed.WasProcessedAsync(job.JobId, cancellationToken))
        {
            logger.LogInformation("Idempotent skip jobId={JobId}", job.JobId);
            await queue.AckAsync(job, cancellationToken);
            return;
        }

        try
        {
            await processor.ProcessAsync(job, logger, cancellationToken);
            await processed.MarkProcessedAsync(job.JobId, cancellationToken);
            await statuses.SetAsync(new JobStatus(job.JobId, "completed", queue.Backend), cancellationToken);
            await queue.AckAsync(job, cancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Job failed jobId={JobId} attempt={Attempt}", job.JobId, job.Attempt);
            if (job.Attempt < JobProcessor.MaxAttempts)
            {
                var retry = job with { Attempt = job.Attempt + 1 };
                await statuses.SetAsync(new JobStatus(job.JobId, "retrying", queue.Backend, ex.Message), cancellationToken);
                await queue.EnqueueAsync(retry, cancellationToken);
            }
            else
            {
                await statuses.SetAsync(new JobStatus(job.JobId, "failed", queue.Backend, ex.Message), cancellationToken);
            }
        }
    }
}
