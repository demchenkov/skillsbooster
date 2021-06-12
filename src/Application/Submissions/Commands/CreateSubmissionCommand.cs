using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Submissions.Commands
{
    public class CreateSubmissionCommand : IRequest<int>
    {
        public string Body { get; set; }
        public int ExerciseId { get; set; }
        public int? DuelId { get; set; }
        public int? ChallengeId { get; set; }
        public string Language { get; set; }
    }

    public class CreateSubmissionCommandHandler : IRequestHandler<CreateSubmissionCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly ISubmissionToCheckQueue _checkQueue;

        public CreateSubmissionCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, ISubmissionToCheckQueue checkQueue)
        {
            _context = context;
            _currentUserService = currentUserService;
            _checkQueue = checkQueue;
        }

        public async Task<int> Handle(CreateSubmissionCommand request, CancellationToken cancellationToken)
        {
            var entity = new Submission
            {
                Body = request.Body,
                ExerciseId = request.ExerciseId,
                DuelId = request.DuelId,
                ChallengeId = request.ChallengeId,
                Status = SubmissionStatus.NotChecked,
                SubmittedAt = DateTime.Now,
                SubmitterId = _currentUserService.UserId
            };

            await _context.Submissions.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            await _checkQueue.QueueAsync(entity);

            return entity.Id;
        }
    }
}