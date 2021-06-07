using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Duels.Commands.UpdateDuel
{
    public class UpdateDuelCommand : IRequest<DuelDto>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateDuelCommandHandler : IRequestHandler<UpdateDuelCommand, DuelDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateDuelCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DuelDto> Handle(UpdateDuelCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Duels.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Duel), request.Id);
            }

            entity.Title = request.Title;

            _context.Duels.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DuelDto>(entity);
        }
    }
}