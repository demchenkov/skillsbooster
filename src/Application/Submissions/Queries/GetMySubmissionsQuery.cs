using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Submissions.Dtos;

namespace SkillsBooster.Application.Submissions.Queries
{
    public class GetMySubmissionsQuery: IRequest<IEnumerable<SubmissionDto>>
    {
        public int ExerciseId { get; set; }
    }

    public class GetMySubmissionsQueryQueryHandler : IRequestHandler<GetMySubmissionsQuery, IEnumerable<SubmissionDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetMySubmissionsQueryQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        

        public async Task<IEnumerable<SubmissionDto>> Handle(GetMySubmissionsQuery request, CancellationToken cancellationToken)
        {
            var entities = await _context.Submissions
                .Include(x => x.Exercise)
                .Include(x => x.Submitter)
                .Where(x => x.ExerciseId == request.ExerciseId && x.SubmitterId == _currentUserService.UserId)
                .ProjectToListAsync<SubmissionDto>(_mapper.ConfigurationProvider);

            return entities;
        }
    }

}