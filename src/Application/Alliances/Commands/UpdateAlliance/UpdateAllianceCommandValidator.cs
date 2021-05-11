using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Alliances.Commands.CreateAlliance;

namespace SkillsBooster.Application.Alliances.Commands.UpdateAlliance
{
    public class UpdateAllianceCommandValidator : AbstractValidator<CreateAllianceCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateAllianceCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.")
                .MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");

            RuleFor(v => v.Description)
                .MaximumLength(4000).WithMessage("Title must not exceed 4000 characters.");
        }

        private Task<bool> BeUniqueTitle(string title, CancellationToken cancellationToken)
        {
            return _context.Alliances
                .AllAsync(l => l.Title != title, cancellationToken);
        }
    }
}