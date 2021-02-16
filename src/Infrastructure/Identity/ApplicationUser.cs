using Microsoft.AspNetCore.Identity;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public User User { get; set; }
    }
}