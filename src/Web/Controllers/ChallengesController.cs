using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Challenges.Commands.CreateChallenge;
using SkillsBooster.Application.Challenges.Commands.DeleteChallenge;
using SkillsBooster.Application.Challenges.Commands.UpdateChallenge;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Application.Challenges.Queries;
using SkillsBooster.Web.Contracts;

namespace SkillsBooster.Web.Controllers
{
    public class ChallengesController : BaseApiController
    {
        
        
        [HttpGet(Routes.Challenges.GetById)]
        public async Task<ChallengeDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetChallengeByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Challenges.Create)]
        public async Task<ChallengeDto> Create([FromBody] CreateChallengeCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}