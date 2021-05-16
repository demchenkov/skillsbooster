using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class ChangeMappings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllianceChallenge_Challenge_ChallengesId",
                table: "AllianceChallenge");

            migrationBuilder.DropForeignKey(
                name: "FK_ChallengeExercise_Challenge_ExerciseToChallengeId",
                table: "ChallengeExercise");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Challenge",
                table: "Challenge");

            migrationBuilder.RenameTable(
                name: "Challenge",
                newName: "Challenges");

            migrationBuilder.RenameColumn(
                name: "ExerciseToChallengeId",
                table: "ChallengeExercise",
                newName: "ChallengeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Challenges",
                table: "Challenges",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AllianceChallenge_Challenges_ChallengesId",
                table: "AllianceChallenge",
                column: "ChallengesId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengeId",
                table: "ChallengeExercise",
                column: "ChallengeId",
                principalTable: "Challenges",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AllianceChallenge_Challenges_ChallengesId",
                table: "AllianceChallenge");

            migrationBuilder.DropForeignKey(
                name: "FK_ChallengeExercise_Challenges_ChallengeId",
                table: "ChallengeExercise");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Challenges",
                table: "Challenges");

            migrationBuilder.RenameTable(
                name: "Challenges",
                newName: "Challenge");

            migrationBuilder.RenameColumn(
                name: "ChallengeId",
                table: "ChallengeExercise",
                newName: "ExerciseToChallengeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Challenge",
                table: "Challenge",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AllianceChallenge_Challenge_ChallengesId",
                table: "AllianceChallenge",
                column: "ChallengesId",
                principalTable: "Challenge",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChallengeExercise_Challenge_ExerciseToChallengeId",
                table: "ChallengeExercise",
                column: "ExerciseToChallengeId",
                principalTable: "Challenge",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
