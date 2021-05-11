using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class AllianceConfiguration : IEntityTypeConfiguration<Alliance>
    {
        public void Configure(EntityTypeBuilder<Alliance> builder)
        {
            builder.Property(t => t.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(t => t.Description)
                .HasMaxLength(4000);

            builder.HasOne(x => x.Leader)
                .WithOne();
        }
    }
}