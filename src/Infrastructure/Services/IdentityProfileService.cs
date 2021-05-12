using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Infrastructure.Identity;
using SkillsBooster.Infrastructure.Persistence;

namespace SkillsBooster.Infrastructure.Services
{
    public class IdentityProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityProfileService(IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, UserManager<ApplicationUser> userManager, ApplicationDbContext applicationDbContext)
        {
            _claimsFactory = claimsFactory;
            _userManager = userManager;
            _applicationDbContext = applicationDbContext;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            var appUser = await _applicationDbContext.AppUsers.FirstOrDefaultAsync(x => x.IdentityUserId == user.Id);
            if (appUser != null)
            {
                claims.Add(new Claim(JwtClaimTypes.GivenName, appUser.FullName));
                claims.Add(new Claim(JwtClaimTypes.Id, appUser.Id.ToString()));
            }

            claims.Add(new Claim(IdentityServerConstants.StandardScopes.Email, user.Email));
            

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}