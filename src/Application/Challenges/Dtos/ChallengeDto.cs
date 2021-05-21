using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using SkillsBooster.Application.Alliances.Dtos;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Application.Exercises.Dtos;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Challenges.Dtos
{
    public class ChallengeDto : IMapFrom<Challenge>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ChallengeStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public IList<ChallengeAllianceDto> Competitors { get; set; }
        public IList<ChallengeExerciseDto> Exercises { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Challenge, ChallengeDto>()
                .ForMember(x => x.Exercises, opt => opt.Ignore())
                .ForMember(x => x.Competitors, opt => opt.Ignore());
        }
    }

    public class ChallengeExerciseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public SubmissionStatus Status { get; set; }
        public string SubmittedBy { get; set; }
        public double Score { get; set; }
    }


    public class ChallengeAllianceDto
    {
        public AllianceDto Alliance { get; set; }
        public Dictionary<int, double> ExerciseScore { get; set; }
        public double TotalScore => ExerciseScore.Values.Sum();
    }
}