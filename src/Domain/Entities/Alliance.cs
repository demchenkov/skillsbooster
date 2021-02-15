using System.Collections.Generic;

namespace SkillsBooster.Domain.Entities
{
    public class Alliance
    {
        public int Id { get; set; }
        public string Title { get; set; }
        
        public IList<User> Members { get; private set; } = new List<User>();
    }
}