using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SkillsBooster.Application.Submissions.Commands;
using SkillsBooster.Application.Submissions.Dtos;
using SkillsBooster.Application.Submissions.Queries;
using SkillsBooster.Web.Contracts;

namespace SkillsBooster.Web.Controllers
{
    public class SubmissionsController : BaseApiController
    {
        [HttpGet(Routes.Submissions.GetMySubmissions)]
        public async Task<IEnumerable<SubmissionDto>> GetMySubmissions([FromQuery] int exerciseId)
        {
            return await Mediator.Send(new GetMySubmissionsQuery() { ExerciseId = exerciseId });
        }

        [HttpGet(Routes.Submissions.GetById)]
        public async Task<SubmissionDto> GetById([FromRoute] int id)
        {
            return await Mediator.Send(new GetSubmissionByIdQuery { Id = id });
        }
        
        
        [HttpPost(Routes.Submissions.Create)]
        public async Task<int> Create([FromBody] CreateSubmissionCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}