using System.Collections.Generic;

namespace Domain.Entities
{
    public class Challenge
    {
        public int Id { get; set; }
        public string Title { get; set; }
        
        public IList<Alliance> Competitors { get; private set; } = new List<Alliance>();
        public IList<Exercise> Exercises { get; private set; } = new List<Exercise>();
    }
}