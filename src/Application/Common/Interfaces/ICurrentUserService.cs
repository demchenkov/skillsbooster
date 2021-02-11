using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        public int UserId { get; }
        public Task<User> GetUserAsync();
    }
}