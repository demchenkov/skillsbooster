using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Alliances.Commands.CreateAlliance
{
    public class CreateAllianceCommandValidator : AbstractValidator<CreateAllianceCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreateAllianceCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            
            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");
                //.MustAsync(BeUniqueTitle).WithMessage("The specified title already exists.");

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