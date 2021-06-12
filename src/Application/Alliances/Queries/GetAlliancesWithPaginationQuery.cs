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
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetAlliancesWithPaginationQuery: IRequest<PaginatedList<AllianceDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        public string FieldName { get; set; }
        public string Search { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetAlliancesWithPaginationQueryHandler: IRequestHandler<GetAlliancesWithPaginationQuery, PaginatedList<AllianceDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAlliancesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<PaginatedList<AllianceDto>> Handle(GetAlliancesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Alliance> query = _context.Alliances;
            if (!string.IsNullOrWhiteSpace(request.FieldName))
            {
                query = query.OrderByWithDirection(request.FieldName.FirstCharToUpper(), request.Order);
            }

            if (!string.IsNullOrWhiteSpace(request.Search))
            {
                query = query.Where(x => EF.Functions.Like(x.Title, $"%{request.Search}%"));
            }

            return query
                .Include(x => x.Leader)
                .Include(x => x.Ranking)
                .ProjectTo<AllianceDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}