using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Alliances.Commands.CreateAlliance;
using SkillsBooster.Application.Alliances.Commands.DeleteAlliance;
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
        public async Task<AllianceDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetAllianceByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Alliances.Create)]
        public async Task<AllianceDto> Create([FromBody] CreateAllianceCommand command)
        {
            var user = User;
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
    }
}