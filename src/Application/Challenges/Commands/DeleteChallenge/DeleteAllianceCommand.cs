using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Challenges.Commands.DeleteChallenge
{
    public class DeleteChallengeCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteChallengeCommandHandler : IRequestHandler<DeleteChallengeCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteChallengeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteChallengeCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Challenges.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Challenge), request.Id);
            }

            _context.Challenges.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}