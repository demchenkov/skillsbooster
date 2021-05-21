using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class AllianceRankingConfiguration : IEntityTypeConfiguration<AllianceRanking>
    {
        public void Configure(EntityTypeBuilder<AllianceRanking> builder)
        {
            builder.ToView(nameof(AllianceRanking))
                .HasKey(x => x.Id);
        }
    }
}