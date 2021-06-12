using System;
using System.Threading;
using System.Threading.Tasks;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Interfaces
{
    public interface ISubmissionToCheckQueue
    {
        ValueTask QueueAsync(Submission submission);

        ValueTask<Submission> DequeueAsync(CancellationToken cancellationToken);
    }
}