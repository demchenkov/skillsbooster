using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Users.Dtos;
using SkillsBooster.Application.Users.Queries;
using SkillsBooster.Web.Contracts;
using System.Threading.Tasks;

namespace SkillsBooster.Web.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly ICurrentUserService _currentUserService;

        public UsersController(ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
        }

        [HttpGet(Routes.Users.GetAll)]
        public async Task<PaginatedList<UserDto>> GetAll([FromQuery] GetUsersWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }



        [HttpGet(Routes.Users.GetMe)]
        public async Task<UserDto> GetMe()
        {
            return await Mediator.Send(new GetUserByIdQuery() { Id = _currentUserService.UserId });
        }

        [HttpGet(Routes.Users.GetById)]
        public async Task<UserDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetUserByIdQuery() { Id = _currentUserService.UserId });
        }
        
        
        //[HttpPost(Routes.Users.Update)]
        //public async Task<int> Create([FromBody] CreateSubmissionCommand command)
        //{
        //    throw new NotImplementedException();
        //    //return await Mediator.Send(command);
        //}
    }
}