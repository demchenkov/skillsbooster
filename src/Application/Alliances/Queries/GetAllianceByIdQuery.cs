using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Alliances.Dtos;

namespace SkillsBooster.Application.Alliances.Queries
{
    public class GetAllianceByIdQuery: IRequest<AllianceDto>
    {
        public int Id { get; set; }
    }

    public class GetAllianceByIdQueryHandler: IRequestHandler<GetAllianceByIdQuery, AllianceDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAllianceByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<AllianceDto> Handle(GetAllianceByIdQuery request, CancellationToken cancellationToken)
        {
            var alliance = await _context.Alliances
                .Include(x => x.Leader)
                .Include(x => x.Ranking)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            return _mapper.Map<AllianceDto>(alliance);
        }
    }

}