using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.LeaderBoard.Dtos
{
    public class PersonalLeaderBoardDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Solutions { get; set; }
        public uint Rank { get; set; }
        public double TotalScore { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, PersonalLeaderBoardDto>()
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.FullName))
                .ForMember(d => d.Rank, opt => opt.MapFrom(s => s.Ranking.Rank))
                .ForMember(d => d.Solutions, opt => opt.Ignore())
                .ForMember(d => d.TotalScore, opt => opt.MapFrom(s => s.Ranking.TotalScore));
        }
    }
}