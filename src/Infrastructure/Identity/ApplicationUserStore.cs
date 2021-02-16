using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Infrastructure.Persistence;

namespace SkillsBooster.Infrastructure.Identity
{
    public class ApplicationUserStore : UserStore<ApplicationUser>
    {
        private readonly ApplicationDbContext _context;

        public ApplicationUserStore(ApplicationDbContext context, IdentityErrorDescriber describer = null) : base(context, describer)
        {
            _context = context;
        }

        public override async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken = new CancellationToken())
        {
            try
            {
                var result = await base.CreateAsync(user, cancellationToken);
                if (!result.Succeeded)
                    return result;
                var appUser = new User
                {
                    IdentityUserId = user.Id
                };
                await _context.AppUsers.AddAsync(appUser, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);
                return IdentityResult.Success;
            }
            catch (Exception)
            {
                return IdentityResult.Failed();
            }
        }
    }
}