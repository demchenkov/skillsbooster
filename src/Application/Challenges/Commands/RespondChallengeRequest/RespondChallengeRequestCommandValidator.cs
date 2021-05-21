using FluentValidation;
using SkillsBooster.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SkillsBooster.Application.Challenges.Commands.RespondChallengeRequest
{
    public class RespondChallengeRequestCommandValidator : AbstractValidator<RespondChallengeRequestCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RespondChallengeRequestCommandValidator(ICurrentUserService currentUserService, IUserService userService, IApplicationDbContext context)
        {
            _currentUserService = currentUserService;
            _context = context;

            RuleFor(v => v.Accepted)
                .MustAsync(BeAllianceLeader)
                .WithMessage("User must be alliance leader to respond challenge request");

            RuleFor(v => v.ChallengeId)
                .MustAsync(IsChallengeRequestExist)
                .WithMessage("This request does not exist");
        }

        private async Task<bool> BeAllianceLeader(bool accepted, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            return currentUserAlliance?.LeaderId == _currentUserService.UserId;
        }

        private async Task<bool> IsChallengeRequestExist(int challengeId, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            var challengeRequest = await _context.ChallengeRequests.FirstOrDefaultAsync(
                x => x.AllianceId == currentUserAlliance.Id && x.ChallengeId == challengeId,
                cancellationToken);

            return challengeRequest != null;
        }
    }
}