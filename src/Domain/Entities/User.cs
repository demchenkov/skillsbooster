namespace SkillsBooster.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FullName => $"{LastName} {FirstName}";

        public string IdentityUserId { get; set; }

        public UserRanking Ranking { get; set; }
    }
}