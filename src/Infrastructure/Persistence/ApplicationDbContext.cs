using System.Reflection;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Infrastructure.Identity;

namespace SkillsBooster.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser, int>, IApplicationDbContext
    {
        public ApplicationDbContext(
            DbContextOptions options, 
            IOptions<OperationalStoreOptions> operationalStoreOptions
            ) : base(options, operationalStoreOptions)
        { }

        // public DbSet<Alliance> Alliances { get; set; }
        // public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}