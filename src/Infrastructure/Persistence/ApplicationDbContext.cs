﻿using System.Reflection;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Infrastructure.Identity;

namespace SkillsBooster.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        public ApplicationDbContext(
            DbContextOptions options, 
            IOptions<OperationalStoreOptions> operationalStoreOptions
            ) : base(options, operationalStoreOptions)
        { }

        public DbSet<Alliance> Alliances { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<User> AppUsers { get; set; }
        public DbSet<Duel> Duels { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<UserRequest> UserRequests { get; set; }
        public DbSet<ChallengeRequest> ChallengeRequests { get; set; }
        public DbSet<UserRanking> UserRankings { get; set; }
        public DbSet<AllianceRanking> AllianceRankings { get; set; }
        public DbSet<BestSubmission> BestSubmissions { get; set; }
        public DbSet<Test> Tests { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}