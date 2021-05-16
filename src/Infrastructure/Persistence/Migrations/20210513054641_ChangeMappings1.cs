using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class ChangeMappings1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengeId",
                table: "ChallengeExercise");

            migrationBuilder.RenameColumn(
                name: "ChallengeId",
                table: "ChallengeExercise",
                newName: "ChallengesId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengesId",
                table: "ChallengeExercise",
                column: "ChallengesId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengesId",
                table: "ChallengeExercise");

            migrationBuilder.RenameColumn(
                name: "ChallengesId",
                table: "ChallengeExercise",
                newName: "ChallengeId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengeId",
                table: "ChallengeExercise",
                column: "ChallengeId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
