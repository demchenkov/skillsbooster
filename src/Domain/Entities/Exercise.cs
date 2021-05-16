using System.Collections;
using System.Collections.Generic;
using SkillsBooster.Domain.Enums;

namespace SkillsBooster.Domain.Entities
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string MarkdownBody { get; set; }
        public int MaxScore { get; set; }
        public Difficulty Difficulty { get; set; }

        public User Author { get; set; }
        public int AuthorId { get; set; }

        public ICollection<Challenge> Challenges { get; set; }
    }
}