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
    public class GetAllianceChallengeRequestsQuery : IRequest<IEnumerable<AllianceChallengeRequestDto>>
    {
        public int Id { get; set; }
    }

    public class GetAllianceChallengeRequestsQueryHandler : IRequestHandler<GetAllianceChallengeRequestsQuery, IEnumerable<AllianceChallengeRequestDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetAllianceChallengeRequestsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }


        public async Task<IEnumerable<AllianceChallengeRequestDto>> Handle(GetAllianceChallengeRequestsQuery request, CancellationToken cancellationToken)
        {
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();
            
            if (userAlliance == null)
                return null;

            var requests = await _context.ChallengeRequests
                .Include(x => x.Challenge)
                .Where(x => x.AllianceId == userAlliance.Id).ToListAsync(cancellationToken);

            return _mapper.Map<IEnumerable<AllianceChallengeRequestDto>>(requests);
        }
    }
}