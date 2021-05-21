using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Alliances.Commands.RespondJoinRequest
{
    public class RespondJoinRequestCommand : IRequest
    {
        public int UserId { get; set; }
        public bool Accepted { get; set; }
    }

    public class RespondJoinRequestCommandHandler : IRequestHandler<RespondJoinRequestCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RespondJoinRequestCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RespondJoinRequestCommand request, CancellationToken cancellationToken)
        {
            var currentUserAlliance = await _currentUserService.GetCurrentUserAlliance();

            var joinRequest = await _context.UserRequests.FirstOrDefaultAsync(
                x => x.AllianceId == currentUserAlliance.Id && x.UserId == request.UserId,
                cancellationToken);

            _context.UserRequests.Remove(joinRequest);
            if (request.Accepted)
            {
                var user = await _context.AppUsers.FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);
                currentUserAlliance.Members.Add(user);

                _context.Alliances.Update(currentUserAlliance);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}