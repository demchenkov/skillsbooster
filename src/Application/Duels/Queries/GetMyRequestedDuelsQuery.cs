using AutoMapper;
using MediatR;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Domain.Enums;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Duels.Queries
{
    public class GetMyRequestedDuelsQuery : IRequest<List<DuelDto>> { }

    public class GetMyRequestedDuelsQueryHandler : IRequestHandler<GetMyRequestedDuelsQuery, List<DuelDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetMyRequestedDuelsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public Task<List<DuelDto>> Handle(GetMyRequestedDuelsQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;
            return _context.Duels.Where(x => x.OpponentId == userId && x.Status == DuelStatus.Created )
                .ProjectToListAsync<DuelDto>(_mapper.ConfigurationProvider);

        }
    }
}