using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Exercises.Dtos
{
    public class ExerciseDto : IMapFrom<Exercise>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string MarkdownBody { get; set; }
        public int MaxScore { get; set; }
        public int Difficulty { get; set; }
        
        public int AuthorId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Exercise, ExerciseDto>()
                .ForMember(d => d.Difficulty, opt => opt.MapFrom(s => (int)s.Difficulty));
        }
    }
}