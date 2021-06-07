using FluentValidation;
using SkillsBooster.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SkillsBooster.Application.Duels.Commands.RespondDuelRequest
{
    public class RespondDuelRequestCommandValidator : AbstractValidator<RespondDuelRequestCommand>
    {
        private readonly IApplicationDbContext _context;

        public RespondDuelRequestCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(v => v.DuelId)
                .MustAsync(IsDuelExist)
                .WithMessage("This duel does not exist");
        }

        private async Task<bool> IsDuelExist(int duelId, CancellationToken cancellationToken)
        {
            return await _context.Duels.FindAsync(duelId) != null;
        }
    }
}