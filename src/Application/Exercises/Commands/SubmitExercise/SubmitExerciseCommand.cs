using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Exercises.Commands.SubmitExercise
{
    public class SubmitExerciseCommand : IRequest<int>
    {
        public string Body { get; set; }
        public int ExerciseId { get; set; }
    }

    public class SubmitExerciseCommandHandler : IRequestHandler<SubmitExerciseCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public SubmitExerciseCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(SubmitExerciseCommand request, CancellationToken cancellationToken)
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