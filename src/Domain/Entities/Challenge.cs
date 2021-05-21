using System;
using System.Collections.Generic;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Domain.Entities
{
    public class Challenge
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ChallengeStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        

        public IList<Alliance> Competitors { get; private set; } = new List<Alliance>();
        public IList<Exercise> Exercises { get; private set; } = new List<Exercise>();
    }
}