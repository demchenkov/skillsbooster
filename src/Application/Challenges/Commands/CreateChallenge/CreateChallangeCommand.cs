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
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Challenges.Commands.CreateChallenge
{
    public class CreateChallengeCommand : IRequest<ChallengeDto>
    {
        public string Title { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public IEnumerable<int> Exercises { get; set; }
        public IEnumerable<int> Alliances { get; set; }
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
            var userAlliance = await _currentUserService.GetCurrentUserAlliance();
            var entity = new Challenge
            {
                Title = request.Title,
                StartDate = request.StartDate,
                FinishDate = request.FinishDate,
                Status = ChallengeStatus.Scheduled,
                Competitors = { userAlliance }
            };
            foreach (var taskId in request.Exercises)
            {
                var exercise = await _context.Exercises.FindAsync(new object[] { taskId }, cancellationToken);
                if (exercise != null)
                    entity.Exercises.Add(exercise);
            }

            await _context.Challenges.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);


            foreach (var allianceId in request.Alliances)
            {
                var challengeRequest = new ChallengeRequest {AllianceId = allianceId, ChallengeId = entity.Id};
                await _context.ChallengeRequests.AddAsync(challengeRequest, cancellationToken);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<ChallengeDto>(entity);
        }
    }
}