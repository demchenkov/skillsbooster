using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class UpdateBestSubmissionView : Migration
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
	                                        select Id,
												   ROW_NUMBER() over (partition by ExerciseId, SubmitterId order by Score desc) as row_num
											from [dbo].[Submissions] 
	                                    ) innerSub on sub.Id = innerSub.Id
												   AND innerSub.row_num = 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
