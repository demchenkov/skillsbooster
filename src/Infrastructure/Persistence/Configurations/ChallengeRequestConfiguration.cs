using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class ChallengeRequestConfiguration : IEntityTypeConfiguration<ChallengeRequest>
    {
        public void Configure(EntityTypeBuilder<ChallengeRequest> builder)
        {
            builder.HasKey(x => new {x.AllianceId, x.ChallengeId});

            builder.HasOne(x => x.Challenge)
                .WithMany()
                .HasForeignKey(x => x.ChallengeId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Alliance)
                .WithMany()
                .HasForeignKey(x => x.AllianceId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}