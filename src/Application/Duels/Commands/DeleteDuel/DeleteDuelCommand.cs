using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Duels.Commands.DeleteDuel
{
    public class DeleteDuelCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteDuelCommandHandler : IRequestHandler<DeleteDuelCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteDuelCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteDuelCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Duels.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Duel), request.Id);
            }

            _context.Duels.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}