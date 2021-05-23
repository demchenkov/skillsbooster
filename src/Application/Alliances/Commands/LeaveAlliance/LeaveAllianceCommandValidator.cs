using FluentValidation;
using SkillsBooster.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Alliances.Commands.LeaveAlliance
{
    public class LeaveAllianceCommandValidator : AbstractValidator<LeaveAllianceCommand>
    {
        private readonly ICurrentUserService _currentUserService;

        public LeaveAllianceCommandValidator(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;

            RuleFor(x => x.AllianceId)
                .MustAsync(BeAllianceMember).WithMessage("User must be alliance member to proceed this action");
        }


        private async Task<bool> BeAllianceMember(int allianceId, CancellationToken cancellationToken)
        {
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();
            return userAlliance?.Id == allianceId;
        }
    }
}