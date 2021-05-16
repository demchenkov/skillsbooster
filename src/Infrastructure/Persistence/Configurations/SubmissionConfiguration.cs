using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
    {
        public void Configure(EntityTypeBuilder<Submission> builder)
        {
            builder.Property(t => t.Id)
                .UseIdentityColumn();

            builder.Property(t => t.Body)
                .IsRequired();
                                      

            builder.HasOne(x => x.Exercise)
                .WithMany()
                .HasForeignKey(x => x.ExerciseId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Submitter)
                .WithMany()
                .HasForeignKey(x => x.SubmitterId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
