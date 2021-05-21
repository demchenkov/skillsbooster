namespace SkillsBooster.Domain.Entities
{
    public class UserRanking
    {
        public int Id { get; set; }
        public double TotalScore { get; set; }
        public uint Rank { get; set; }
    }
}