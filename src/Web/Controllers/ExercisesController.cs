using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Exercises.Commands.CreateExercise;
using SkillsBooster.Application.Exercises.Commands.DeleteExercise;
using SkillsBooster.Application.Exercises.Commands.UpdateExercise;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Application.Exercises.Queries;
using SkillsBooster.Web.Contracts;

namespace SkillsBooster.Web.Controllers
{
    public class ExercisesController : BaseApiController
    {
        [HttpGet(Routes.Exercises.GetAll)]
        public async Task<PaginatedList<ExerciseDto>> GetAll([FromQuery] GetExercisesWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }
        
        [HttpGet(Routes.Exercises.GetById)]
        public async Task<ExerciseDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetExerciseByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Exercises.Create)]
        public async Task<ExerciseDto> Create([FromBody] CreateExerciseCommand command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpPut(Routes.Exercises.Update)]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpDelete(Routes.Exercises.Delete)]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            await Mediator.Send(new DeleteExerciseCommand { Id = id });
            return NoContent();
        }
    }
}