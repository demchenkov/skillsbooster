namespace SkillsBooster.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string FullName => $"{LastName} {FirstName}";
        public string Position { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhotoUrl { get; set; }


        public string IdentityUserId { get; set; }

        public UserRanking Ranking { get; set; }
    }
}