using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class UserRankingConfiguration : IEntityTypeConfiguration<UserRanking>
    {
        public void Configure(EntityTypeBuilder<UserRanking> builder)
        {
            builder.ToView(nameof(UserRanking))
                .HasKey(x => x.Id);
        }
    }
}