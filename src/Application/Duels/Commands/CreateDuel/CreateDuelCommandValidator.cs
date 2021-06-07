using FluentValidation;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Duels.Commands.CreateDuel
{
    public class CreateDuelCommandValidator : AbstractValidator<CreateDuelCommand>
    {
        private readonly IApplicationDbContext _context;
        public CreateDuelCommandValidator(IApplicationDbContext context)
        {
            _context = context;
            
            RuleFor(v => v.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

            RuleFor(v => v.OpponentId)
                .Must(x => x > 0).WithMessage($"Invalid {nameof(Duel.OpponentId)} field");
        }
    }
}