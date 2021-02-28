using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Exercises.Commands.UpdateExercise
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

            _context.Exercises.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ExerciseDto>(entity);
        }
    }
}