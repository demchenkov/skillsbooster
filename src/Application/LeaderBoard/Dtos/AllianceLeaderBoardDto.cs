using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.LeaderBoard.Dtos
{
    public class AllianceLeaderBoardDto : IMapFrom<Alliance>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Leader { get; set; }
        public uint Rank { get; set; }
        public double TotalScore { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Alliance, AllianceLeaderBoardDto>()
                .ForMember(d => d.Leader, opt => opt.MapFrom(s => s.Leader.FullName))
                .ForMember(d => d.Rank, opt => opt.MapFrom(s => s.Ranking.Rank))
                .ForMember(d => d.TotalScore, opt => opt.MapFrom(s => s.Ranking.TotalScore));
        }
    }
}