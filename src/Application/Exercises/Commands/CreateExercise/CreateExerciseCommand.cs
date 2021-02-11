using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Exercises.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Exercises.Commands.CreateExercise
{
    public class CreateExerciseCommand : IRequest<ExerciseDto>
    {
        public string Title { get; set; }
        public string MarkdownBody { get; set; }
        public int MaxScore { get; set; }
        public int Difficulty { get; set; }
    }

    public class CreateExerciseCommandHandler : IRequestHandler<CreateExerciseCommand, ExerciseDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public CreateExerciseCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<ExerciseDto> Handle(CreateExerciseCommand request, CancellationToken cancellationToken)
        {
            var entity = new Exercise
            {
                Title = request.Title,
                MarkdownBody = request.MarkdownBody,
                MaxScore = request.MaxScore,
                Difficulty = (Difficulty) request.Difficulty,
                AuthorId = _currentUserService.UserId
            };

            await _context.Exercises.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ExerciseDto>(entity);
        }
    }
}