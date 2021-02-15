using System.Security.Claims;
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
                var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
                int.TryParse(userId, out int id);
                return id;
            }   
        }
    }
}