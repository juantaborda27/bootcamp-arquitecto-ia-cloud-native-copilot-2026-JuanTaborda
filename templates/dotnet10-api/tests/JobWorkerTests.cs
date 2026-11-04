using Messaging;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace Api.Tests;

public class JobWorkerTests
{
    [Fact]
    public async Task Handle_RetriesTransientFailureThenCompletes()
    {
        var runtime = new InMemoryJobRuntime();
        var worker = new JobWorker(runtime, runtime, runtime, new JobProcessor(), NullLogger<JobWorker>.Instance);
        var job = new EmailJob("job-retry", "corr-1", UserId: -1, Attempt: 1);

        await worker.HandleAsync(job, CancellationToken.None);
        var retrying = await runtime.GetAsync("job-retry");
        Assert.Equal("retrying", retrying?.State);

        var retry = await runtime.DequeueAsync();
        Assert.NotNull(retry);
        Assert.Equal(2, retry!.Attempt);
        await worker.HandleAsync(retry, CancellationToken.None);

        var done = await runtime.GetAsync("job-retry");
        Assert.Equal("completed", done?.State);
    }

    [Fact]
    public async Task Handle_SkipsAlreadyProcessedJob()
    {
        var runtime = new InMemoryJobRuntime();
        var worker = new JobWorker(runtime, runtime, runtime, new JobProcessor(), NullLogger<JobWorker>.Instance);
        var job = new EmailJob("job-dup", "corr-2", 7);

        await worker.HandleAsync(job, CancellationToken.None);
        await worker.HandleAsync(job, CancellationToken.None);

        var status = await runtime.GetAsync("job-dup");
        Assert.Equal("completed", status?.State);
        Assert.True(await runtime.WasProcessedAsync("job-dup"));
    }
}
