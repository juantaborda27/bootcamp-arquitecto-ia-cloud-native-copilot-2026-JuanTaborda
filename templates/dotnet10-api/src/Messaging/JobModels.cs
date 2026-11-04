namespace Messaging;

public sealed record EmailJob(
    string JobId,
    string CorrelationId,
    int UserId,
    int Attempt = 1);

public sealed record EnqueueEmailRequest(int UserId);

public sealed record JobStatus(string JobId, string State, string Backend, string? Detail = null);
