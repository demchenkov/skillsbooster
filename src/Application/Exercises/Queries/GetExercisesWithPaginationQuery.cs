using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Newtonsoft.Json.Converters;
using SkillsBooster.Application.Common.Extensions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Exercises.Queries
{
    public class GetExercisesWithPaginationQuery: IRequest<PaginatedList<ExerciseDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        public string FieldName { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
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
            IQueryable<Exercise> query = _context.Exercises;
            if (!string.IsNullOrWhiteSpace(request.FieldName))
            {
                query = query.OrderByWithDirection(_ => request.FieldName.FirstCharToUpper(), request.Order);
            }
            
            return query
                .ProjectTo<ExerciseDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}