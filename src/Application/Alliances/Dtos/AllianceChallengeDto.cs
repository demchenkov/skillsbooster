using System;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Application.Alliances.Dtos
{
    public class AllianceChallengeDto : IMapFrom<Challenge>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ChallengeStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
    }
}