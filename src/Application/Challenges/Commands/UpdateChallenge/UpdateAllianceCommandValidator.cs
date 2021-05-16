using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Challenges.Commands.CreateChallenge;

namespace SkillsBooster.Application.Challenges.Commands.UpdateChallenge
{
    public class UpdateChallengeCommandValidator : AbstractValidator<CreateChallengeCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateChallengeCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
                .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");

        }

        private Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
        {
            return _context.Challenges
                .AllAsync(l => l.Title != title, cancellationToken);
        }
    }
}