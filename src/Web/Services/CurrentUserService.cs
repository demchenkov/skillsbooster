using System.Security.Claims;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using SkillsBooster.Application.Common.Interfaces;

namespace SkillsBooster.Web.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId
        {
            get
            {
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(JwtClaimTypes.Id);
                int.TryParse(userId, out int id);
                return 1;
            }   
        }
    }
}