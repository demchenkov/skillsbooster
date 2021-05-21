using System.Threading.Tasks;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        int UserId { get; }

        Task<User> GetCurrentUser();
        Task<Alliance> GetCurrentUserAlliance();
    }
}