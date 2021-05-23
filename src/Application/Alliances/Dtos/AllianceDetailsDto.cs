using System;
using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Alliances.Dtos
{
    public class AllianceDetailsDto : IMapFrom<Alliance>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string PhotoUrl { get; set; }

        public string Leader { get; set; }
        public uint Rank { get; set; }
        public AllianceUserType UserType { get; set; }  


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Alliance, AllianceDetailsDto>()
                .ForMember(d => d.Leader, opt => opt.MapFrom(s => s.Leader.FullName))
                .ForMember(d => d.Rank, opt => opt.MapFrom(s => s.Ranking.Rank))
                .ForMember(d => d.UserType, opt => opt.Ignore());
        }
    }
}