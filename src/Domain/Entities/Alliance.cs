using System;
using System.Collections.Generic;

namespace SkillsBooster.Domain.Entities
{
    public class Alliance
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public string PhotoUrl { get; set; }

        public User Leader { get; set; }
        public int LeaderId { get; set; }

        public IList<User> Members { get; private set; } = new List<User>();
    }
}