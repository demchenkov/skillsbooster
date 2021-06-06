using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Alliances.Queries;
using SkillsBooster.Application.Common.Interfaces;
using SkillsBooster.Application.Submissions.Commands;
using SkillsBooster.Application.Users.Dtos;
using SkillsBooster.Application.Users.Queries;
using SkillsBooster.Web.Contracts;
using System;
using System.Collections.Generic;
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

        //[HttpGet(Routes.Users.GetAll)]
        //public async Task<IEnumerable<UserDto>> GetAll([FromQuery] GetAlliancesWithPaginationQuery query)
        //{
        //    throw new NotImplementedException();
        //}


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