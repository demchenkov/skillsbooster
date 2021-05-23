using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Alliances.Commands.CreateAlliance;
using SkillsBooster.Application.Alliances.Commands.DeleteAlliance;
using SkillsBooster.Application.Alliances.Commands.LeaveAlliance;
using SkillsBooster.Application.Alliances.Commands.RequestJoin;
using SkillsBooster.Application.Alliances.Commands.RespondJoinRequest;
using SkillsBooster.Application.Alliances.Commands.UpdateAlliance;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Alliances.Queries;
using SkillsBooster.Web.Contracts;

namespace SkillsBooster.Web.Controllers
{
    public class AlliancesController : BaseApiController
    {
        [HttpGet(Routes.Alliances.GetAll)]
        public async Task<PaginatedList<AllianceDto>> GetAll([FromQuery] GetAlliancesWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }
        
        [HttpGet(Routes.Alliances.GetById)]
        public async Task<AllianceDetailsDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetAllianceByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Alliances.Create)]
        public async Task<AllianceDto> Create([FromBody] CreateAllianceCommand command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPut(Routes.Alliances.Update)]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAllianceCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpDelete(Routes.Alliances.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await Mediator.Send(new DeleteAllianceCommand { Id = id });
            return NoContent();
        }

        [HttpGet(Routes.Alliances.GetAllianceChallenges)]
        public async Task<IEnumerable<AllianceChallengeDto>> GetAllianceChallenges([FromRoute] int id)
        {
            return await Mediator.Send(new GetAllianceChallengesQuery{ Id = id });
        }

        [HttpGet(Routes.Alliances.GetAllianceChallengeRequests)]
        public async Task<IEnumerable<AllianceChallengeRequestDto>> GetAllianceChallengeRequests([FromRoute] int id)
        {
            return await Mediator.Send(new GetAllianceChallengeRequestsQuery { Id = id });
        }



        [HttpGet(Routes.Alliances.GetAllianceJoinRequests)]
        public async Task<IEnumerable<AllianceJoinRequestDto>> GetAllianceJoinRequests([FromRoute] int id)
        {
            return await Mediator.Send(new GetAllianceJoinRequestsQuery { Id = id });
        }

        [HttpPost(Routes.Alliances.RequestToJoin)]
        public async Task<IActionResult> RequestToJoin([FromRoute] int id)
        {
            await Mediator.Send(new RequestJoinCommand() { AllianceId = id });
            return NoContent();
        }

        [HttpPut(Routes.Alliances.RespondToJoinRequest)]
        public async Task<IActionResult> RespondToJoinRequest([FromBody] RespondJoinRequestCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete(Routes.Alliances.LeaveFromAlliance)]
        public async Task<IActionResult> LeaveFromAlliance([FromRoute] int id)
        {
            await Mediator.Send(new LeaveAllianceCommand {AllianceId = id});
            return NoContent();
        }
    }
}