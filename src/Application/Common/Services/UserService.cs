using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDbContext _context;

        public UserService(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<User> GetUserAsync(int userId)
        {
            return _context.AppUsers.FirstOrDefaultAsync(x => x.Id == userId);
        }

        public Task<User> FindUserAsync(Func<User, bool> predicate)
        {
            return _context.AppUsers.FirstOrDefaultAsync(x => predicate(x));
        }

        public Task<Alliance> GetUserAlliance(int userId)
        {
            return _context.Alliances
                .Include(x => x.Members)
                .FirstOrDefaultAsync(x => x.LeaderId == userId || x.Members.FirstOrDefault(m => m.Id == userId) != null);
        }
    }
}