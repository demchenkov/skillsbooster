using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Alliances.Dtos;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetAllianceChallengesQuery : IRequest<IEnumerable<AllianceChallengeDto>>
    {
        public int Id { get; set; }
    }

    public class GetAllianceChallengesQueryHandler : IRequestHandler<GetAllianceChallengesQuery, IEnumerable<AllianceChallengeDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllianceChallengesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<IEnumerable<AllianceChallengeDto>> Handle(GetAllianceChallengesQuery request, CancellationToken cancellationToken)
        {
            var alliance = await _context.Alliances
                .Include(x => x.Challenges)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return _mapper.Map<IEnumerable<AllianceChallengeDto>>(alliance.Challenges);
        }
    }

}