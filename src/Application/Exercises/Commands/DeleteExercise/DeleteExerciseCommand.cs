using System.Threading;
using System.Threading.Tasks;
using MediatR;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Exercises.Commands.DeleteExercise
{
    public class DeleteExerciseCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteExerciseCommandHandler : IRequestHandler<DeleteExerciseCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteExerciseCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteExerciseCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Exercises.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Exercise), request.Id);
            }

            _context.Exercises.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}