using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Commands.CreateAlliance
{
    public class CreateAllianceCommand : IRequest<AllianceDto>
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class CreateAllianceCommandHandler : IRequestHandler<CreateAllianceCommand, AllianceDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public CreateAllianceCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<AllianceDto> Handle(CreateAllianceCommand request, CancellationToken cancellationToken)
        {
            var entity = new Alliance
            {
                Title = request.Title,
                Description = request.Description,
                LeaderId = _currentUserService.UserId,
                CreationDate = DateTime.Now,

            };

            await _context.Alliances.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<AllianceDto>(entity);
        }
    }
}