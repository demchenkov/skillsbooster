using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Web.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserService _userService;
        private readonly IApplicationDbContext _context;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor, IApplicationDbContext context, IUserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _userService = userService;
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

        public Task<User> GetCurrentUser()
        {
            return _context.AppUsers.FirstOrDefaultAsync(x => x.Id == UserId);
        }

        public Task<Alliance> GetCurrentUserAlliance()
        {
            return _userService.GetUserAlliance(UserId);
        }
    }
}