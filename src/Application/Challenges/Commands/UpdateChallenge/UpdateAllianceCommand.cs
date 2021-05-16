using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Challenges.Commands.UpdateChallenge
{
    public class UpdateChallengeCommand : IRequest<ChallengeDto>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateChallengeCommandHandler : IRequestHandler<UpdateChallengeCommand, ChallengeDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateChallengeCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ChallengeDto> Handle(UpdateChallengeCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Challenges.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Challenge), request.Id);
            }

            entity.Title = request.Title;

            _context.Challenges.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ChallengeDto>(entity);
        }
    }
}