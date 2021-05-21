using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetAllianceJoinRequestsQuery : IRequest<IEnumerable<AllianceJoinRequestDto>>
    {
        public int Id { get; set; }
    }

    public class GetAllianceJoinRequestsQueryHandler : IRequestHandler<GetAllianceJoinRequestsQuery, IEnumerable<AllianceJoinRequestDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetAllianceJoinRequestsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }


        public async Task<IEnumerable<AllianceJoinRequestDto>> Handle(GetAllianceJoinRequestsQuery request, CancellationToken cancellationToken)
        {
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();
            
            if (userAlliance == null)
                return null;

            var requests = await _context.UserRequests
                .Include(x => x.User)
                .Where(x => x.AllianceId == userAlliance.Id).ToListAsync(cancellationToken);

            return _mapper.Map<IEnumerable<AllianceJoinRequestDto>>(requests);
        }
    }
}