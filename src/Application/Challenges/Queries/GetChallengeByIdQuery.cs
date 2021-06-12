using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Internal;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Challenges.Queries
{
    public class GetChallengeByIdQuery: IRequest<ChallengeDto>
    {
        public int Id { get; set; }
    }

    public class GetChallengeByIdQueryHandler: IRequestHandler<GetChallengeByIdQuery, ChallengeDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IUserService _userService;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetChallengeByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService, IUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _currentUserService = currentUserService;
            _userService = userService;
        }
        

        public async Task<ChallengeDto> Handle(GetChallengeByIdQuery request, CancellationToken cancellationToken)
        {
            var challenge = await _context.Challenges
                .Include(x => x.Competitors)
                .Include(x => x.Exercises)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);


            var allianceSubmissions = await GetAllianceSubmissionsAsync(request, cancellationToken);

            var competitorsDto = GetCompetitors(challenge, allianceSubmissions);

            var currentUserAlliance = await _userService.GetUserAlliance(_currentUserService.UserId);
            var exercisesDto = GetExercises(challenge, currentUserAlliance, allianceSubmissions);

            var res = _mapper.Map<ChallengeDto>(challenge);
            res.Competitors = competitorsDto;
            res.Exercises = exercisesDto;

            return res;
        }

        private List<ChallengeAllianceDto> GetCompetitors(Challenge challenge, IReadOnlyDictionary<int, Dictionary<int, Submission>> allianceSubmissions)
        {
            return challenge.Competitors.Select(x =>
            {
                var dictionary = new Dictionary<int, double>();

                if (allianceSubmissions.ContainsKey(x.Id))
                {
                    dictionary = allianceSubmissions[x.Id]
                        .ToDictionary(k => k.Key, v => v.Value.Score);
                }

                return new ChallengeAllianceDto
                {
                    Alliance = _mapper.Map<AllianceDto>(x),
                    ExerciseScore = dictionary,
                };
            }).ToList();
        }

        private List<ChallengeExerciseDto> GetExercises(Challenge challenge, Alliance currentUserAlliance, IReadOnlyDictionary<int, Dictionary<int, Submission>> allianceSubmissions)
        {
            var submissions = allianceSubmissions?.GetValueOrDefault(currentUserAlliance.Id);
            var res = challenge.Exercises.Select(x =>
            {
                var submission = submissions?.GetValueOrDefault(x.Id);
                return new ChallengeExerciseDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Score = submission?.Score ?? default,
                    SubmittedBy = submission?.Submitter.FullName ?? string.Empty,
                    Status = submission?.Status ?? SubmissionStatus.NotChecked
                };
            }).ToList();

            return res;
        }


        private async Task<Dictionary<int, Dictionary<int, Submission>>> GetAllianceSubmissionsAsync(GetChallengeByIdQuery request, CancellationToken cancellationToken)
        {
            var challengeSubmissions = await _context.Submissions
                .Include(x => x.Submitter)
                .Where(x => x.ChallengeId == request.Id)
                .ToListAsync(cancellationToken);

            var alliancesSubmissions = new Dictionary<int, List<Submission>>();
            foreach (var submission in challengeSubmissions)
            {
                var alliance = await _userService.GetUserAlliance(submission.SubmitterId);

                if (alliance == null) continue;

                if (!alliancesSubmissions.ContainsKey(alliance.Id))
                {
                    alliancesSubmissions[alliance.Id] = new List<Submission>();
                }

                alliancesSubmissions[alliance.Id].Add(submission);
            }

            var res = new Dictionary<int, Dictionary<int, Submission>>();
            foreach (var (key, submissions) in alliancesSubmissions)
            {
                var bestSubmissions = submissions
                    .GroupBy(s => s.ExerciseId)
                    .Select(g => new {Id = g.Key, Submission = g.FirstOrDefault(s => Math.Abs(s.Score - g.Max(x => x.Score)) < 0.001) })
                    .ToDictionary(k => k.Id, d => d.Submission);

                res.Add(key, bestSubmissions);
            }

            return res;
        }
    }

}