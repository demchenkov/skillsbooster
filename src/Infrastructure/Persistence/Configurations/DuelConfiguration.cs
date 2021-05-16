using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class DuelConfiguration : IEntityTypeConfiguration<Duel>
    {
        public void Configure(EntityTypeBuilder<Duel> builder)
        {
            builder.Property(t => t.Id)
                .UseIdentityColumn();

            builder.Property(t => t.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.HasOne(x => x.Initiator)
                .WithMany()
                .HasForeignKey(x => x.InitiatorId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Opponent)
                .WithMany()
                .HasForeignKey(x => x.OpponentId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasMany(x => x.Exercises)
                .WithMany(x => x.Duels);
        }
    }
}