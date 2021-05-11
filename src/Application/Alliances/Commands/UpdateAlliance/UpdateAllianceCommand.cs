using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Common.Exceptions;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Alliances.Commands.UpdateAlliance
{
    public class UpdateAllianceCommand : IRequest<AllianceDto>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class UpdateAllianceCommandHandler : IRequestHandler<UpdateAllianceCommand, AllianceDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateAllianceCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AllianceDto> Handle(UpdateAllianceCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Alliances.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Alliance), request.Id);
            }

            entity.Title = request.Title;
            entity.Description = request.Description;

            _context.Alliances.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<AllianceDto>(entity);
        }
    }
}