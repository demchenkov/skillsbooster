using System;
using System.Threading.Tasks;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Interfaces
{
    public interface IUserService
    {
        
        Task<User> GetUserAsync(int userId);
        Task<User> FindUserAsync(Func<User, bool> predicate);
    }
}