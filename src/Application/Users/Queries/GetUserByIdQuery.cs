using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Users.Dtos;
using SkillsBooster.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SkillsBooster.Application.Users.Queries
{
    public class GetUserByIdQuery : IRequest<UserDto>
    {
        public int Id { get; set; }
    }

    public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public GetUserByIdQueryHandler(IApplicationDbContext context, IMapper mapper, IUserService userService)
        {
            _context = context;
            _mapper = mapper;
            _userService = userService;
        }
        

        public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.AppUsers
                .Include(x => x.Ranking)
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            var userDto = _mapper.Map<UserDto>(user);
            userDto.SolvedTasks = await GetUserSolvedTasksAsync(request.Id, cancellationToken);
            userDto.DuelStats = await GetUserDuelStats(request.Id, cancellationToken);
            userDto.AllianceTitle = (await _userService.GetUserAlliance(request.Id))?.Title;

            return userDto;
        }

        private async Task<Dictionary<DuelResult, int>> GetUserDuelStats(int userId, CancellationToken cancellationToken)
        {
            var query = _context.Duels
                .Where(x => x.OpponentId == userId || x.OpponentId == userId);

            var activeCount = await query.Where(x => x.FinishDate > DateTime.Now &&
                                                     x.StartDate < DateTime.Now)
                .CountAsync(cancellationToken);
            var finishedDuels = await query.Where(x => x.FinishDate < DateTime.Now).ToListAsync(cancellationToken);

            var duelsSubmissions = await _context.BestSubmissions
                .Where(x => x.DuelId != null && finishedDuels.Select(d => d.Id).Contains((int) x.DuelId))
                .ToListAsync(cancellationToken);
            var wonCount = duelsSubmissions
                .GroupBy(x => x.DuelId)
                .Select(x =>
                {
                    var a = x.GroupBy(s => s.SubmitterId)
                        .ToDictionary(k => k.Key, v => v.Sum(s => s.Score));

                    var userScore = a.GetValueOrDefault(userId);
                    return a.Any(pair => pair.Value > userScore) ? 0 : 1;
                })
                .Sum();

            var lostCount = finishedDuels.Count - wonCount;


            return new Dictionary<DuelResult, int>
            {
                {DuelResult.Active, activeCount},
                {DuelResult.Lost, lostCount},
                {DuelResult.Won, wonCount}
            };
        }



        private async Task<Dictionary<Difficulty, SolvedTaskDto>> GetUserSolvedTasksAsync(int userId, CancellationToken cancellationToken)
        {
            var userSolvedTasks = await _context.BestSubmissions
                .Include(x => x.Exercise)
                .Where(x => x.SubmitterId == userId && x.Status == SubmissionStatus.Completed)
                .ToListAsync(cancellationToken);

            var solvedTasksDictionary = new Dictionary<Difficulty, SolvedTaskDto>();

            foreach (Difficulty difficulty in Enum.GetValues(typeof(Difficulty)))
            {
                var totalTasks = await _context.Exercises.Where(x => x.Difficulty == difficulty).CountAsync(cancellationToken);
                var solvedTasks = userSolvedTasks.Count(x => x.Exercise.Difficulty == difficulty);
                solvedTasksDictionary[difficulty] = new SolvedTaskDto
                {
                    Solved = solvedTasks,
                    Total = totalTasks
                };
            }

            return solvedTasksDictionary;
        }
    }

}