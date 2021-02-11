using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Exercises.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Exercises.Commands.UpdateExercise
{
    public class UpdateExerciseCommand : IRequest<ExerciseDto>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string MarkdownBody { get; set; }
        public int MaxScore { get; set; }
        public int Difficulty { get; set; }
    }

    public class UpdateExerciseCommandHandler : IRequestHandler<UpdateExerciseCommand, ExerciseDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateExerciseCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ExerciseDto> Handle(UpdateExerciseCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Exercises.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Exercise), request.Id);
            }

            entity.Title = request.Title;
            entity.MarkdownBody = request.MarkdownBody;
            entity.MaxScore = request.MaxScore;
            entity.Difficulty = (Difficulty) request.Difficulty;

            await _context.Exercises.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ExerciseDto>(entity);
        }
    }
}