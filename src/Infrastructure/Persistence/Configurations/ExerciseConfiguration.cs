using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class ExerciseConfiguration : IEntityTypeConfiguration<Exercise>
    {
        public void Configure(EntityTypeBuilder<Exercise> builder)
        {
            builder.Property(t => t.Id)
                .UseIdentityColumn();

            builder.Property(t => t.Title)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(t => t.Topic)
                .HasMaxLength(1000)
                .IsRequired();

            builder.HasOne(x => x.Author)
                .WithMany()
                .HasForeignKey(x => x.AuthorId);
        }
    }
}