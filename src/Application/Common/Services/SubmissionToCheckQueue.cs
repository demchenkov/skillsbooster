using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Services
{
    public class SubmissionToCheckQueue : ISubmissionToCheckQueue
    {
        private readonly Channel<Submission> _queue;

        public SubmissionToCheckQueue()
        {
            var options = new BoundedChannelOptions(100)
            {
                FullMode = BoundedChannelFullMode.Wait
            };
            _queue = Channel.CreateBounded<Submission>(options);
        }

        public async ValueTask QueueAsync(Submission submission)
        {
            if (submission == null)
            {
                throw new ArgumentNullException(nameof(submission));
            }

            await _queue.Writer.WriteAsync(submission);
        }

        public ValueTask<Submission> DequeueAsync(CancellationToken cancellationToken) =>
            _queue.Reader.ReadAsync(cancellationToken);
    }
}