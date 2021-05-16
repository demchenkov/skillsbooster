using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using SkillsBooster.Application.Common.Extensions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Challenges.Queries
{
    public class GetChallengesWithPaginationQuery: IRequest<PaginatedList<ChallengeDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        public string FieldName { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetChallengesWithPaginationQueryHandler: IRequestHandler<GetChallengesWithPaginationQuery, PaginatedList<ChallengeDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetChallengesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<PaginatedList<ChallengeDto>> Handle(GetChallengesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Challenge> query = _context.Challenges;
            if (!string.IsNullOrWhiteSpace(request.FieldName))
            {
                query = query.OrderByWithDirection(request.FieldName.FirstCharToUpper(), request.Order);
            }
            
            return query
                .Include(x => x.Exercises)
                .Include(x => x.Competitors)
                .ProjectTo<ChallengeDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}