using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetChallengeRequestsQuery : IRequest<AllianceDto>
    {
        public int Id { get; set; }
    }

    public class GetChallengeRequestsQueryHandler : IRequestHandler<GetChallengeRequestsQuery, AllianceDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetChallengeRequestsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<AllianceDto> Handle(GetChallengeRequestsQuery request, CancellationToken cancellationToken)
        {
            var alliance = await _context.Alliances
                .Include(x => x.Leader)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            return _mapper.Map<AllianceDto>(alliance);
        }
    }
}