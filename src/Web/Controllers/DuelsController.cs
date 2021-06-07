using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Duels.Commands.CreateDuel;
using SkillsBooster.Application.Duels.Commands.RespondDuelRequest;
using SkillsBooster.Application.Duels.Dtos;
using SkillsBooster.Application.Duels.Queries;
using SkillsBooster.Web.Contracts;
using System.Threading.Tasks;

namespace SkillsBooster.Web.Controllers
{
    public class DuelsController : BaseApiController
    {

        [HttpGet(Routes.Duels.GetMyDuels)]
        public async Task<ActionResult<List<DuelDto>>> My([FromQuery] string type = "active")
        {
            var lowerType = type.Trim().ToLowerInvariant();
            if (lowerType != "active" && lowerType != "requested")
                return BadRequest();

            if (type == "active")
                return await Mediator.Send(new GetMyActiveDuelsQuery());

            return await Mediator.Send(new GetMyRequestedDuelsQuery());
        }

        [HttpGet(Routes.Duels.GetById)]
        public async Task<DuelDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetDuelByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Duels.Create)]
        public async Task<DuelDto> Create([FromBody] CreateDuelCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut(Routes.Duels.Respond)]
        public async Task<IActionResult> Respond([FromRoute] int id, [FromBody] RespondDuelRequestCommand command)
        {
            if (command.DuelId != id)
                return BadRequest();

            await Mediator.Send(command);
            return NoContent();
        }
    }
}