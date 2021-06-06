using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class BestSubmissionConfiguration : IEntityTypeConfiguration<BestSubmission>
    {
        public void Configure(EntityTypeBuilder<BestSubmission> builder)
        {
            builder.ToView("BestSubmissions")
                .HasKey(x => x.Id);
        }
    }
}