using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Commands.DeleteAlliance
{
    public class DeleteAllianceCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteAllianceCommandHandler : IRequestHandler<DeleteAllianceCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteAllianceCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteAllianceCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Alliances.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Alliance), request.Id);
            }

            _context.Alliances.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}