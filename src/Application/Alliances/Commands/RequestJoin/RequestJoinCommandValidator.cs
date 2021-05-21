using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Alliances.Commands.RequestJoin
{
    public class RequestJoinCommandValidator : AbstractValidator<RequestJoinCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RequestJoinCommandValidator(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;

            RuleFor(x => x.AllianceId)
                .MustAsync(BeWithoutAlliance).WithMessage("Еhe current user is already in the alliance.")
                .MustAsync(IsAllianceExist).WithMessage("The alliance with selected id does not exist.");
        }

        private async Task<bool> BeWithoutAlliance(int _, CancellationToken cancellationToken)
        {
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();

            return userAlliance == null;
        }

        private async Task<bool> IsAllianceExist(int allianceId, CancellationToken cancellationToken)
        {
            var alliance = await _context.Alliances.FirstOrDefaultAsync(x => x.Id == allianceId, cancellationToken);

            return alliance != null;
        }
    }
}