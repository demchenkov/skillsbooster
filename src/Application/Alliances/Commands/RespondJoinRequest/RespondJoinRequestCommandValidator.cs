using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Alliances.Commands.RespondJoinRequest
{
    public class RespondJoinRequestCommandValidator : AbstractValidator<RespondJoinRequestCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RespondJoinRequestCommandValidator(ICurrentUserService currentUserService, IApplicationDbContext context)
        {
            _currentUserService = currentUserService;
            _context = context;

            RuleFor(v => v.Accepted)
                .MustAsync(BeAllianceLeader)
                .WithMessage("User must be alliance leader to respond join request");

            RuleFor(v => v.UserId)
                .MustAsync(IsJoinRequestExist)
                .WithMessage("This request does not exist");
        }

        private async Task<bool> BeAllianceLeader(bool accepted, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            return currentUserAlliance?.LeaderId == _currentUserService.UserId;
        }

        private async Task<bool> IsJoinRequestExist(int userId, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            var joinRequest = await _context.UserRequests.FirstOrDefaultAsync(
                x => x.AllianceId == currentUserAlliance.Id && x.UserId == userId,
                cancellationToken);

            return joinRequest != null;
        }
    }
}