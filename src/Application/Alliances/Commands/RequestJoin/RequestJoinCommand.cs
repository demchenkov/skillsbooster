using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Commands.RequestJoin
{
    public class RequestJoinCommand : IRequest
    {
        public int AllianceId { get; set; }
    }

    public class RequestJoinCommandHandler : IRequestHandler<RequestJoinCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RequestJoinCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RequestJoinCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _currentUserService.GetCurrentUser();

            await _context.UserRequests.AddAsync(new UserRequest {AllianceId = request.AllianceId, UserId = currentUser.Id}, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}