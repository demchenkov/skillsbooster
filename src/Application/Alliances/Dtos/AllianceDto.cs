using System;
using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Dtos
{
    public class AllianceDto : IMapFrom<Alliance>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string PhotoUrl { get; set; }

        public string Leader { get; set; }
        public uint Rank { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Alliance, AllianceDto>()
                .ForMember(d => d.Leader, opt => opt.MapFrom(s => s.Leader.FullName))
                .ForMember(d => d.Rank, opt => opt.MapFrom(s => s.Ranking.Rank));
        }
    }
}