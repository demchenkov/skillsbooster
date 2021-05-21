using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Dtos
{
    public class AllianceJoinRequestDto : IMapFrom<ChallengeRequest>
    {
        public int AllianceId { get; set; }
        public int UserId { get; set; }
        public string UserFullName { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<UserRequest, AllianceJoinRequestDto>()
                .ForMember(x => x.UserFullName, opt => opt.MapFrom(s => s.User.FullName));
        }
    }
}