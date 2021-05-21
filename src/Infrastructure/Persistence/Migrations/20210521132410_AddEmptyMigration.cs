using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class AddEmptyMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@" CREATE OR ALTER VIEW [dbo].[BestSubmissions] AS
                                    select 
                                           sub.[Id]
                                          ,sub.[Body]
                                          ,sub.[Status]
                                          ,sub.[Score]
                                          ,sub.[SubmittedAt]
                                          ,sub.[ExerciseId]
                                          ,sub.[SubmitterId]
                                          ,sub.[ChallengeId]
                                          ,sub.[DuelId] 
	                                      from [dbo].[Submissions] sub
	                                    inner join ( 
	                                        select ExerciseId, SubmitterId, MAX(Score) as Score from [dbo].[Submissions] 
	                                        group by ExerciseId, SubmitterId
	                                    ) innerSub on sub.ExerciseId = innerSub.ExerciseId AND sub.SubmitterId = innerSub.SubmitterId AND sub.Score = innerSub.Score");

            migrationBuilder.Sql(@" CREATE OR ALTER VIEW [dbo].[UserRanking] AS
                                    SELECT 
                                        users.Id
	                                    ,ISNULL(SUM(subs.Score * (ex.Difficulty + 1))-COUNT(users.Id), 0) as [TotalScore]
	                                    ,DENSE_RANK() OVER(ORDER BY ISNULL(SUM(subs.Score) - COUNT(users.Id), 0) DESC) AS [Rank]
                                      FROM [dbo].[AppUsers] users

                                      LEFT JOIN [dbo].[BestSubmissions] subs
                                        ON users.Id = subs.SubmitterId
                                      LEFT JOIN [dbo].[Exercises] ex 
                                        ON subs.ExerciseId = ex.Id

                                      GROUP BY users.Id ");

            migrationBuilder.Sql(@" CREATE OR ALTER VIEW [dbo].[AllianceRanking] AS 
                                    SELECT
                                        alliances.Id
                                        ,isnull(SUM(ranking.[TotalScore]), 0) * 0.01  as TotalScore
	                                    ,DENSE_RANK() over(order by isnull(SUM(ranking.[TotalScore]), 0) * 0.01 desc) as [Rank]
                                      FROM [dbo].Alliances alliances

                                      left join [dbo].AppUsers users
                                        on alliances.Id = users.AllianceId 
                                      left join [dbo].[UserRanking] as ranking
                                        on ranking.Id = users.Id

                                      group by alliances.Id");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW [dbo].[BestSubmissions]");
            migrationBuilder.Sql("DROP VIEW [dbo].[UserRanking]");
            migrationBuilder.Sql("DROP VIEW [dbo].[AllianceRanking]");
        }
    }
}
