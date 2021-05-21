namespace SkillsBooster.Domain.Entities
{
    public class ChallengeRequest
    {
        public int ChallengeId { get; set; }
        public Challenge Challenge { get; set; }

        public int AllianceId { get; set; }
        public Alliance Alliance { get; set; }
    }
}