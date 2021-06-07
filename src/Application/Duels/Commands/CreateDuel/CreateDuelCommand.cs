using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Duels.Commands.CreateDuel
{
    public class CreateDuelCommand : IRequest<DuelDto>
    {
        public string Title { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public IEnumerable<int> Exercises { get; set; }
        public int OpponentId { get; set; }
    }

    public class CreateDuelCommandHandler : IRequestHandler<CreateDuelCommand, DuelDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public CreateDuelCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<DuelDto> Handle(CreateDuelCommand request, CancellationToken cancellationToken)
        {
            var entity = new Duel
            {
                Title = request.Title,
                StartDate = request.StartDate,
                FinishDate = request.FinishDate,
                Status = DuelStatus.Created,
                OpponentId = request.OpponentId,
                InitiatorId = _currentUserService.UserId
            };

            var exercises = await _context.Exercises
                .Where(x => request.Exercises.Contains(x.Id))
                .ToListAsync(cancellationToken);

            foreach (var exercise in exercises)
            {
                entity.Exercises.Add(exercise);
            }

            await _context.Duels.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DuelDto>(entity);
        }
    }
}