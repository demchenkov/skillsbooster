using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;
using SkillsBooster.Domain.Enums;
using System.Collections.Generic;

namespace SkillsBooster.Application.Users.Dtos
{
    public class UserDto : IMapFrom<User>
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{LastName} {FirstName}";

        public string Position { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }
        public int Rank { get; set; }

        public string AllianceTitle { get; set; }

        public Dictionary<Difficulty, SolvedTaskDto> SolvedTasks { get; set; }
        public Dictionary<DuelResult, int> DuelStats { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<User, UserDto>()
                .ForMember(d => d.Rank, opt => opt.MapFrom(s => s.Ranking.Rank))
                .ForMember(d => d.SolvedTasks, opt => opt.Ignore())
                .ForMember(d => d.AllianceTitle, opt => opt.Ignore())
                .ForMember(d => d.DuelStats, opt => opt.Ignore());
        }
    }
}