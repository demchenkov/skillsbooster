using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Challenges.Commands.CreateChallenge
{
    public class CreateChallengeCommand : IRequest<ChallengeDto>
    {
        public string Title { get; set; }

        public IEnumerable<int> TaskIds { get; set; }
        public IEnumerable<int> AllianceIds { get; set; }
    }

    public class CreateChallengeCommandHandler : IRequestHandler<CreateChallengeCommand, ChallengeDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public CreateChallengeCommandHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<ChallengeDto> Handle(CreateChallengeCommand request, CancellationToken cancellationToken)
        {
            var entity = new Challenge
            {
                Title = request.Title,
            };
            foreach (var taskId in request.TaskIds)
            {
                entity.Exercises.Add(new Exercise {Id = taskId});
            }

            foreach (var allianceId in request.AllianceIds)
            {
                entity.Competitors.Add(new Alliance { Id = allianceId });
            }

            await _context.Challenges.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ChallengeDto>(entity);
        }
    }
}