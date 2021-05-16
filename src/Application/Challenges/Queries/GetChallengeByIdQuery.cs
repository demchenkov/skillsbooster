using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Challenges.Dtos;

namespace SkillsBooster.Application.Challenges.Queries
{
    public class GetChallengeByIdQuery: IRequest<ChallengeDto>
    {
        public int Id { get; set; }
    }

    public class GetChallengeByIdQueryHandler: IRequestHandler<GetChallengeByIdQuery, ChallengeDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetChallengeByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<ChallengeDto> Handle(GetChallengeByIdQuery request, CancellationToken cancellationToken)
        {
            var challenge = await _context.Challenges
                .Include(x => x.Competitors)
                .Include(x => x.Exercises)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            return _mapper.Map<ChallengeDto>(challenge);
        }
    }

}