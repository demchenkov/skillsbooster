using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class ChallengeConfiguration : IEntityTypeConfiguration<Challenge>
    {
        public void Configure(EntityTypeBuilder<Challenge> builder)
        {
            builder.Property(t => t.Id)
                .UseIdentityColumn();

            builder.Property(t => t.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.HasMany(x => x.Competitors)
                .WithMany(x => x.Challenges);

            builder.HasMany(x => x.Exercises)
                .WithMany(x => x.Challenges);
        }
    }
}