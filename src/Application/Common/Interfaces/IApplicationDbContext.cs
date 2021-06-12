using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Alliance> Alliances { get; set; }
        
        DbSet<Challenge> Challenges { get; set; }
        DbSet<Duel> Duels { get; set; }
        DbSet<Submission> Submissions { get; set; }
        DbSet<User> AppUsers { get; set; }
        DbSet<Exercise> Exercises { get; set; }

        DbSet<UserRequest> UserRequests { get; set; }
        DbSet<ChallengeRequest> ChallengeRequests { get; set; }

        DbSet<UserRanking> UserRankings { get; set; }
        DbSet<AllianceRanking> AllianceRankings { get; set; }

        DbSet<BestSubmission> BestSubmissions { get; set; }

        DbSet<Test> Tests { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}