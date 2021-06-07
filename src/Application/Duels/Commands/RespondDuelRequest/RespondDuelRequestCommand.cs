using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Duels.Commands.RespondDuelRequest
{
    public class RespondDuelRequestCommand : IRequest
    {
        public int DuelId { get; set; }
        public bool Accepted { get; set; }
    }

    public class RespondDuelRequestCommandHandler : IRequestHandler<RespondDuelRequestCommand>
    {
        private readonly IApplicationDbContext _context;

        public RespondDuelRequestCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RespondDuelRequestCommand request, CancellationToken cancellationToken)
        {
            var duel = await _context.Duels.FirstOrDefaultAsync(
                x => x.Id == request.DuelId,
                cancellationToken);

            duel.Status = request.Accepted ? DuelStatus.Accepted : DuelStatus.Declined;
            _context.Duels.Update(duel);
            
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}