using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Alliances.Dtos;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetAllianceByIdQuery: IRequest<AllianceDetailsDto>
    {
        public int Id { get; set; }
    }

    public class GetAllianceByIdQueryHandler: IRequestHandler<GetAllianceByIdQuery, AllianceDetailsDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetAllianceByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        

        public async Task<AllianceDetailsDto> Handle(GetAllianceByIdQuery request, CancellationToken cancellationToken)
        {
            var alliance = await _context.Alliances
                .Include(x => x.Leader)
                .Include(x => x.Ranking)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            var userAlliance = await _currentUserService.GetCurrentUserAlliance();

            var res = _mapper.Map<AllianceDetailsDto>(alliance);
            res.UserType = userAlliance == null ? AllianceUserType.VisitorWithoutAlliance : AllianceUserType.VisitorWithAlliance;

            if (userAlliance?.Id == alliance.Id)
            {
                res.UserType = alliance.LeaderId == _currentUserService.UserId
                    ? AllianceUserType.Manager
                    : AllianceUserType.Member;
            }

            return res;
        }
    }

}