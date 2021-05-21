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

        public static class Alliances
        {
            public const string GetAll = BaseUrl + "/alliances";
            public const string GetById = BaseUrl + "/alliances/{id}";
            public const string Create = BaseUrl + "/alliances";
            public const string Update = BaseUrl + "/alliances/{id}";
            public const string Delete = BaseUrl + "/alliances/{id}";

            public const string GetAllianceChallenges = BaseUrl + "/alliances/{id}/challenges";
            public const string GetAllianceUserRequests = BaseUrl + "/alliances/{id}/user-requests";
            public const string GetAllianceChallengeRequests = BaseUrl + "/alliances/{id}/challenge-requests";
        }

        public static class Challenges
        {
            //public const string GetAll = BaseUrl + "/alliances";
            public const string GetById = BaseUrl + "/challenges/{id}";
            public const string Create = BaseUrl + "/challenges";
            public const string Respond = BaseUrl + "/challenges/{id}";
            //public const string Update = BaseUrl + "/alliances/{id}";
            //public const string Delete = BaseUrl + "/alliances/{id}";
        }
    }
}