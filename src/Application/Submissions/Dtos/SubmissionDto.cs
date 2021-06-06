using System;
using AutoMapper;
using SkillsBooster.Application.Common.Mappings;
using SkillsBooster.Domain.Entities;

namespace SkillsBooster.Application.Submissions.Dtos
{
    public class SubmissionDto : IMapFrom<Submission>
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public double Score { get; set; }
        public DateTime SubmittedAt { get; set; }

        public int ExerciseId { get; set; }
        public string ExerciseTitle { get; set; }

        public int SubmitterId { get; set; }
        public string SubmitterName { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Submission, SubmissionDto>()
                .ForMember(d => d.Status, opt => opt.MapFrom(s => (int)s.Status))
                .ForMember(d => d.SubmitterName, opt => opt.MapFrom(s => s.Submitter.FullName))
                .ForMember(d => d.ExerciseTitle, opt => opt.MapFrom(s => s.Exercise.Title));
        }
    }
}