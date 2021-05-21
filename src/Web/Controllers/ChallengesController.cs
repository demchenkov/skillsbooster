using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Challenges.Commands.CreateChallenge;
using SkillsBooster.Application.Challenges.Commands.RespondChallengeRequest;
using SkillsBooster.Application.Challenges.Dtos;
using SkillsBooster.Application.Challenges.Queries;
using SkillsBooster.Web.Contracts;
using System.Threading.Tasks;

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

        [HttpPut(Routes.Challenges.Respond)]
        public async Task<IActionResult> Respond([FromRoute] int id, [FromBody] RespondChallengeRequestCommand command)
        {
            if (command.ChallengeId != id)
                return BadRequest();

            await Mediator.Send(command);
            return NoContent();
        }
    }
}