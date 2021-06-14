using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.LeaderBoard.Dtos;
using SkillsBooster.Application.LeaderBoard.Queries;
using SkillsBooster.Web.Contracts;
using System.Threading.Tasks;

namespace SkillsBooster.Web.Controllers
{
    public class LeaderBoardController : BaseApiController
    {
        [HttpGet(Routes.LeaderBoard.GetAllAlliances)]
        public async Task<PaginatedList<AllianceLeaderBoardDto>> GetAllAlliances([FromQuery] GetAllianceLeaderBoardQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet(Routes.LeaderBoard.GetAllPersonal)]
        public async Task<PaginatedList<PersonalLeaderBoardDto>> GetAllUsers([FromQuery] GetPersonalLeaderBoardQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}