using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Submissions.Dtos;

namespace SkillsBooster.Application.Submissions.Queries
{
    public class GetSubmissionByIdQuery: IRequest<SubmissionDto>
    {
        public int Id { get; set; }
    }

    public class GetSubmissionByIdQueryHandler : IRequestHandler<GetSubmissionByIdQuery, SubmissionDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetSubmissionByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        

        public async Task<SubmissionDto> Handle(GetSubmissionByIdQuery request, CancellationToken cancellationToken)
        {
            var exercise = await _context.Submissions
                .Include(x => x.Exercise)
                .Include(x => x.Submitter)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            return _mapper.Map<SubmissionDto>(exercise);
        }
    }

}