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
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Duels.Queries
{
    public class GetDuelsWithPaginationQuery: IRequest<PaginatedList<DuelDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        
        public string FieldName { get; set; }
        
        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetDuelsWithPaginationQueryHandler: IRequestHandler<GetDuelsWithPaginationQuery, PaginatedList<DuelDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetDuelsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public Task<PaginatedList<DuelDto>> Handle(GetDuelsWithPaginationQuery request, CancellationToken cancellationToken)
        {
            IQueryable<Duel> query = _context.Duels;
            if (!string.IsNullOrWhiteSpace(request.FieldName))
            {
                query = query.OrderByWithDirection(request.FieldName.FirstCharToUpper(), request.Order);
            }
            
            return query
                //.Include(x => x.Exercises)
                //.Include(x => x.Competitors)
                .ProjectTo<DuelDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }

}