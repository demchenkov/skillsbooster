using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Challenges.Commands.CreateChallenge
{
    public class CreateChallengeCommandValidator : AbstractValidator<CreateChallengeCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreateChallengeCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            
            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

            RuleFor(v => v.Alliances)
                .Must(x => x != null && x.Count() > 1);
        }
        
        private Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
        {
            return _context.Challenges
                .AllAsync(l => l.Title != title, cancellationToken);
        }
    }
}