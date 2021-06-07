using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Duels.Commands.SubmitDuelExercise
{
    public class SubmitDuelExerciseCommand : IRequest<int>
    {
        public string Body { get; set; }
        public int ExerciseId { get; set; }
        public int DuelId { get; set; }
    }

    public class SubmitDuelExerciseCommandHandler : IRequestHandler<SubmitDuelExerciseCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public SubmitDuelExerciseCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(SubmitDuelExerciseCommand request, CancellationToken cancellationToken)
        {
            var solution = new Submission
            {
                Body = request.Body,
                ExerciseId = request.ExerciseId,
                Score = 0,
                Status = SubmissionStatus.NotChecked,
                SubmittedAt = DateTime.Now,
                SubmitterId = _currentUserService.UserId
            };

            await _context.Submissions.AddAsync(solution, cancellationToken);

            return solution.Id;
        }
    }

}