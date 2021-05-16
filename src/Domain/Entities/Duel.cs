using System;
using System.Collections.Generic;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Domain.Entities
{
    public class Duel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DuelStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }

        public int InitiatorId { get; set; }
        public User Initiator { get; set; }

        public int OpponentId { get; set; }
        public User Opponent { get; set; }

        public IList<Exercise> Exercises { get; private set; } = new List<Exercise>();
    }
}