using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Alliance> Alliances { get; set; }
        //
        // DbSet<Challenge> Challenges { get; set; }

        DbSet<Exercise> Exercises { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}