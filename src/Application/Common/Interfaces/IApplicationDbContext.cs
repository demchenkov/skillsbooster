using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> Users { get; set; }

        DbSet<Alliance> Alliances { get; set; }
        
        DbSet<Challenge> Challenges { get; set; }
        
        DbSet<Exercise> Exercises { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}