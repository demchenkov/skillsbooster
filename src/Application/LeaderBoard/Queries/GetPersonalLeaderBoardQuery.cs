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
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.LeaderBoard.Queries
{
    public class GetPersonalLeaderBoardQuery: IRequest<PaginatedList<PersonalLeaderBoardDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        [JsonConverter(typeof(StringEnumConverter))]
        public OrderingDirection Order { get; set; }
    }

    public class GetPersonalLeaderBoardQueryHandler : IRequestHandler<GetPersonalLeaderBoardQuery, PaginatedList<PersonalLeaderBoardDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetPersonalLeaderBoardQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<PersonalLeaderBoardDto>> Handle(GetPersonalLeaderBoardQuery request, CancellationToken cancellationToken)
        {
            var res = await _context.AppUsers
                .Include(x => x.Ranking)
                .OrderBy(x => x.Ranking.Rank)
                .ProjectTo<PersonalLeaderBoardDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);

            var userIds = res.Items.Select(x => x.Id);
            var dictionary = (await _context.BestSubmissions.Where(x => userIds.Contains(x.SubmitterId))
                .ToListAsync(cancellationToken))
                .GroupBy(x => x.SubmitterId)
                .ToDictionary(g => g.Key, g => g.Count());

            res.Items.ForEach(x => x.Solutions = dictionary.GetValueOrDefault(x.Id));

            return res;
        }
    }
}