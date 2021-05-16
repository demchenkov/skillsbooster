using System;
using System.Collections.Generic;
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

        public IList<AllianceDto> Competitors { get; set; }
        public IList<ExerciseDto> Exercises { get; set; }
    }
}