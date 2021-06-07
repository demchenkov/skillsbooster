using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Application.Users.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Duels.Queries
{
    public class GetDuelByIdQuery: IRequest<DuelDto>
    {
        public int Id { get; set; }
    }

    public class GetDuelByIdQueryHandler: IRequestHandler<GetDuelByIdQuery, DuelDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetDuelByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }
        

        public async Task<DuelDto> Handle(GetDuelByIdQuery request, CancellationToken cancellationToken)
        {
            var duel = await _context.Duels
                .Include(x => x.Initiator)
                .Include(x => x.Opponent)
                .Include(x => x.Exercises)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);


            var userSubmissions = await GetUserSubmissionsAsync(request.Id, cancellationToken);
            var competitorsDto = GetCompetitors(duel, userSubmissions);
            var exercisesDto = GetExercises(duel, userSubmissions);

            var res = _mapper.Map<DuelDto>(duel);
            res.Competitors = competitorsDto;
            res.Exercises = exercisesDto;

            return res;
        }


        private List<DuelUserDto> GetCompetitors(Duel duel, IReadOnlyDictionary<int, Dictionary<int, Submission>> userSubmissions)
        {
            var competitors = new List<User> {duel.Initiator, duel.Opponent};

            return competitors.Select(x =>
            {
                var dictionary = new Dictionary<int, double>();

                if (userSubmissions.ContainsKey(x.Id))
                {
                    dictionary = userSubmissions[x.Id]
                        .ToDictionary(k => k.Key, v => v.Value.Score);
                }

                return new DuelUserDto
                {
                    User = _mapper.Map<UserDto>(x),
                    ExerciseScore = dictionary,
                };
            }).ToList();
        }


        private List<DuelExerciseDto> GetExercises(Duel challenge,  IReadOnlyDictionary<int, Dictionary<int, Submission>> allianceSubmissions)
        {
            var submissions = allianceSubmissions?.GetValueOrDefault(_currentUserService.UserId);
            var res = challenge.Exercises.Select(x =>
            {
                var submission = submissions?.GetValueOrDefault(x.Id);
                return new DuelExerciseDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Score = submission?.Score ?? default,
                    //SubmittedBy = submission?.Submitter.FullName ?? string.Empty,
                    Status = submission?.Status ?? SubmissionStatus.NotChecked
                };
            }).ToList();

            return res;
        }


        private async Task<Dictionary<int, Dictionary<int, Submission>>> GetUserSubmissionsAsync(int duelId, CancellationToken cancellationToken)
        {
            var duelSubmissions = await _context.Submissions
                .Include(x => x.Submitter)
                .Where(x => x.DuelId == duelId)
                .ToListAsync(cancellationToken);


            return duelSubmissions
                .GroupBy(x => x.SubmitterId)
                .ToDictionary(k => k.Key, v => v
                    .GroupBy(x => x.ExerciseId)
                    .Select(g => new { Id = g.Key, Submission = g.FirstOrDefault(s => Math.Abs(s.Score - g.Max(x => x.Score)) < 0.001) })
                    .ToDictionary(k => k.Id, d => d.Submission)
                );
        }
    }

}