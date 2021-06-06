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
    }

    public class CreateSubmissionCommandHandler : IRequestHandler<CreateSubmissionCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public CreateSubmissionCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
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

            return entity.Id;
        }
    }
}