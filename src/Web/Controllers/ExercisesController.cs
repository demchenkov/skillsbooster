using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Common.Models;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Application.Exercises.Queries;
using SkillsBooster.Web.Contracts;

namespace SkillsBooster.Web.Controllers
{
    public class ExercisesController : BaseApiController
    {
        [HttpGet(Routes.Exercises.GetAll)]
        public async Task<PaginatedList<ExerciseDto>> GetExercises([FromQuery] GetExercisesWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}