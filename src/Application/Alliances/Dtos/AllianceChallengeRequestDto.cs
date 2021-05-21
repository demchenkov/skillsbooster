using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Dtos
{
    public class AllianceChallengeRequestDto : IMapFrom<ChallengeRequest>
    {
        public int AllianceId { get; set; }
        public int ChallengeId { get; set; }
        public string ChallengeTitle { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<ChallengeRequest, AllianceChallengeRequestDto>()
                .ForMember(x => x.ChallengeTitle, opt => opt.MapFrom(s => s.Challenge.Title));
        }
    }
}