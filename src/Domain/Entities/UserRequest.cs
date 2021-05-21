namespace SkillsBooster.Domain.Entities
{
    public class UserRequest
    {
        public int UserId { get; set; }
        public User User { get; set; }
        
        public int AllianceId { get; set; }
        public Alliance Alliance { get; set; }
    }
}