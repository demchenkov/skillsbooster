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

            public const string RequestToJoin = BaseUrl + "/alliances/{id}/members";
            public const string RespondToJoinRequest = BaseUrl + "/alliances/{id}/members";
            public const string LeaveFromAlliance = BaseUrl + "/alliances/{id}/members";

            public const string GetAllianceChallenges = BaseUrl + "/alliances/{id}/challenges";
            public const string GetAllianceJoinRequests = BaseUrl + "/alliances/{id}/join-requests";
            public const string GetAllianceChallengeRequests = BaseUrl + "/alliances/{id}/challenge-requests";
        }

        public static class Challenges
        {
            public const string GetById = BaseUrl + "/challenges/{id}";
            public const string Create = BaseUrl + "/challenges";
            public const string Respond = BaseUrl + "/challenges/{id}";
        }

        public static class Duels
        {
            public const string GetById = BaseUrl + "/duels/{id}";
            public const string Create = BaseUrl + "/duels";
            public const string GetMyDuels = BaseUrl + "/duels/my";
            public const string Respond = BaseUrl + "/duels/{id}";
        }

        public static class Submissions
        {
            public const string GetMySubmissions = BaseUrl + "/submissions/my";
            public const string GetById = BaseUrl + "/submissions/{id}";
            public const string Create = BaseUrl + "/submissions";
        }

        public static class Users
        {
            public const string GetAll = BaseUrl + "/users";
            public const string GetMe = BaseUrl + "/users/me";
            public const string GetById = BaseUrl + "/users/{id}";
            public const string Update = BaseUrl + "/users/{id}";
        }

        public static class LeaderBoard
        {
            public const string GetAllAlliances = BaseUrl + "/leaderboard/alliances";
            public const string GetAllPersonal = BaseUrl + "/leaderboard/personal";
        }
    }
}