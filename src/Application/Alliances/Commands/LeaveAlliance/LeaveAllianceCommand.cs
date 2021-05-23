using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Alliances.Commands.LeaveAlliance
{
    public class LeaveAllianceCommand : IRequest
    {
        public int AllianceId { get; set; }
    }

    public class LeaveAllianceCommandHandler : IRequestHandler<LeaveAllianceCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public LeaveAllianceCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(LeaveAllianceCommand request, CancellationToken cancellationToken)
        {
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();
            var userId = _currentUserService.UserId;

            var user = userAlliance.Members.First(x => x.Id == userId);
            userAlliance.Members.Remove(user);

            _context.Alliances.Update(userAlliance);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}