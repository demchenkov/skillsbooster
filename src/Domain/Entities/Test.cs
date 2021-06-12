namespace SkillsBooster.Domain.Entities
{
    public class Test
    {
        public int Id { get; set; }
        public string ClassName { get; set; }
        public string Method { get; set; }
        public string ParamsJson { get; set; }
        public string ResultType { get; set; }
        public string ExpectedResult { get; set; }

        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}