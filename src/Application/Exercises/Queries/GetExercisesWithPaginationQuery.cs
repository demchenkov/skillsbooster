using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.Exercises.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;

namespace Application.Exercises.Queries
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