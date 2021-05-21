using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Challenges.Commands.RespondChallengeRequest
{
    public class RespondChallengeRequestCommand : IRequest
    {
        public int ChallengeId { get; set; }
        public bool Accepted { get; set; }
    }

    public class RespondChallengeRequestCommandHandler : IRequestHandler<RespondChallengeRequestCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RespondChallengeRequestCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RespondChallengeRequestCommand request, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            var challengeRequest = await _context.ChallengeRequests.FirstOrDefaultAsync(
                x => x.AllianceId == currentUserAlliance.Id && x.ChallengeId == request.ChallengeId,
                cancellationToken);

            _context.ChallengeRequests.Remove(challengeRequest);
            if (request.Accepted)
            {
                var challenge = await _context.Challenges.FirstOrDefaultAsync(x => x.Id == request.ChallengeId, cancellationToken);
                challenge.Competitors.Add(currentUserAlliance);
                
                _context.Challenges.Update(challenge);
            }
            
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}