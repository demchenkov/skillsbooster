using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Infrastructure.Identity;

namespace SkillsBooster.Infrastructure.Persistence.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasOne(x => x.User)
                .WithOne()
                .HasForeignKey<User>(u => u.IdentityUserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasOne(x => x.Ranking)
                .WithOne()
                .HasForeignKey<UserRanking>(x => x.Id);
        }
    }
}