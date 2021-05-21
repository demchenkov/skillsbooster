using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class UserRequestConfiguration : IEntityTypeConfiguration<UserRequest>
    {
        public void Configure(EntityTypeBuilder<UserRequest> builder)
        {
            builder.HasKey(x => new { x.AllianceId, x.UserId });

            builder.HasOne(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Alliance)
                .WithMany()
                .HasForeignKey(x => x.AllianceId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}