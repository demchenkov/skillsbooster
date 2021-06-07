using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Users.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SkillsBooster.Application.Duels.Dtos
{
    public class DuelDto : IMapFrom<Duel>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DuelStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public IList<DuelUserDto> Competitors { get; set; }
        public IList<DuelExerciseDto> Exercises { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Duel, DuelDto>()
                .ForMember(x => x.Exercises, opt => opt.Ignore())
                .ForMember(x => x.Competitors, opt => opt.Ignore());
        }
    }

    public class DuelExerciseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public SubmissionStatus Status { get; set; }
        //public string SubmittedBy { get; set; }
        public double Score { get; set; }
    }


    public class DuelUserDto
    {
        public UserDto User { get; set; }
        public Dictionary<int, double> ExerciseScore { get; set; }
        public double TotalScore => ExerciseScore.Values.Sum();
    }
}