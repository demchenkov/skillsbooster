using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using SkillsBooster.Application.Common.Extensions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.LeaderBoard.Dtos;
using SkillsBooster.Domain.Entities;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.LeaderBoard.Queries
{
    public class GetAllianceLeaderBoardQuery : IRequest<PaginatedList<AllianceLeaderBoardDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;


        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetAllianceLeaderBoardQueryHandler : IRequestHandler<GetAllianceLeaderBoardQuery, PaginatedList<AllianceLeaderBoardDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllianceLeaderBoardQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<PaginatedList<AllianceLeaderBoardDto>> Handle(GetAllianceLeaderBoardQuery request, CancellationToken cancellationToken)
        {
            return _context.Alliances
                .Include(x => x.Ranking)
                .Include(x => x.Leader)
                .OrderBy(x => x.Ranking.Rank)
                .ProjectTo<AllianceLeaderBoardDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}