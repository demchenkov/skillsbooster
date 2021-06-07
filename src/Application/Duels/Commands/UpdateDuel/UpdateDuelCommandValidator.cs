using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Duels.Commands.CreateDuel;

namespace SkillsBooster.Application.Duels.Commands.UpdateDuel
{
    public class UpdateDuelCommandValidator : AbstractValidator<CreateDuelCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateDuelCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
                .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");

        }

        private Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
        {
            return _context.Duels
                .AllAsync(l => l.Title != title, cancellationToken);
        }
    }
}