namespace SkillsBooster.Web.Contracts
{
    public static partial class Routes
    {
        private const string BaseUrl = "/api";

        public static class Exercises
        {
            public const string GetAll = BaseUrl + "/exercises";
            public const string GetById = BaseUrl + "/exercises/{id}";
            public const string Create = BaseUrl + "/exercises";
            public const string Update = BaseUrl + "/exercises/{id}";
            public const string Delete = BaseUrl + "/exercises/{id}";
        }
        
    }
}