using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Web.BackgroundServices
{
    public class SubmissionCheckService : BackgroundService
    {
        private readonly ILogger<SubmissionCheckService> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private CSharpCodeTester _sharpCodeTester;

        public SubmissionCheckService(ISubmissionToCheckQueue taskQueue,
            ILogger<SubmissionCheckService> logger, 
            IServiceScopeFactory serviceScopeFactory)
        {
            TaskQueue = taskQueue;
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }

        public ISubmissionToCheckQueue TaskQueue { get; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation(
                $"Queued Hosted Service is running.{Environment.NewLine}" +
                $"{Environment.NewLine}Tap W to add a work item to the " +
                $"background queue.{Environment.NewLine}");

            await BackgroundProcessing(stoppingToken);
        }

        private async Task BackgroundProcessing(CancellationToken cancellationToken)
        {
            using var scope = _serviceScopeFactory.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();


            while (!cancellationToken.IsCancellationRequested)
            {
                var submission = await TaskQueue.DequeueAsync(cancellationToken);

                var dictionary = (await context.Tests.ToListAsync(cancellationToken))
                    .GroupBy(x => x.ExerciseId)
                    .ToDictionary(g => g.Key, x => x.ToList());

                _sharpCodeTester = new CSharpCodeTester(dictionary);

                try
                {
                    var sub = await CheckSubmission(submission);
                    context.Submissions.Update(sub);
                    await context.SaveChangesAsync(cancellationToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while submissions was checking.");
                }
            }
        }

        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Queued Hosted Service is stopping.");

            await base.StopAsync(stoppingToken);
        }


        private async Task<Submission> CheckSubmission(Submission submission)
        {
            var score = await _sharpCodeTester.TestCode(submission);
            submission.Score = score;
            submission.Status = score == 0 ? SubmissionStatus.Failed :
                score >= 100 ? SubmissionStatus.Completed : SubmissionStatus.PartialCompleted;
            return submission;
        }
    }
}