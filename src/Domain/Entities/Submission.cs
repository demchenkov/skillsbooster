﻿using SkillsBooster.Domain.Enums;
using System;

namespace SkillsBooster.Domain.Entities
{
    public class Submission
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public SubmissionStatus Status { get; set; }
        public double Score { get; set; }
        public DateTime SubmittedAt { get; set; }
        public string Language { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }

        public int SubmitterId { get; set; }
        public User Submitter { get; set; }

        public int? ChallengeId { get; set; }
        public int? DuelId { get; set; }
    }
}