using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Exercises.Dtos;

namespace SkillsBooster.Application.Exercises.Queries
{
    public class GetExercisesWithPaginationQuery: IRequest<PaginatedList<ExerciseDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetExercisesWithPaginationQueryHandler: IRequestHandler<GetExercisesWithPaginationQuery, PaginatedList<ExerciseDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetExercisesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<PaginatedList<ExerciseDto>> Handle(GetExercisesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            return _context.Exercises
                .OrderBy(x => x.Difficulty)
                .ProjectTo<ExerciseDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}