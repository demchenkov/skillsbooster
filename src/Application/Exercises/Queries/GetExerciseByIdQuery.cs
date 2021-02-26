using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Exercises.Dtos;

namespace SkillsBooster.Application.Exercises.Queries
{
    public class GetExerciseByIdQuery: IRequest<ExerciseDto>
    {
        public int Id { get; set; }
    }

    public class GetExerciseByIdQueryHandler: IRequestHandler<GetExerciseByIdQuery, ExerciseDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetExerciseByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<ExerciseDto> Handle(GetExerciseByIdQuery request, CancellationToken cancellationToken)
        {
            var exercise = await _context.Exercises.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            return _mapper.Map<ExerciseDto>(exercise);
        }
    }

}