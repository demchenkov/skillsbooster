using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class AddChallange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Challenge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Challenge", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AllianceChallenge",
                columns: table => new
                {
                    ChallengesId = table.Column<int>(type: "int", nullable: false),
                    CompetitorsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AllianceChallenge", x => new { x.ChallengesId, x.CompetitorsId });
                    table.ForeignKey(
                        name: "FK_AllianceChallenge_Alliances_CompetitorsId",
                        column: x => x.CompetitorsId,
                        principalTable: "Alliances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AllianceChallenge_Challenge_ChallengesId",
                        column: x => x.ChallengesId,
                        principalTable: "Challenge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChallengeExercise",
                columns: table => new
                {
                    ExerciseToChallengeId = table.Column<int>(type: "int", nullable: false),
                    ExercisesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChallengeExercise", x => new { x.ExerciseToChallengeId, x.ExercisesId });
                    table.ForeignKey(
                        name: "FK_ChallengeExercise_Challenge_ExerciseToChallengeId",
                        column: x => x.ExerciseToChallengeId,
                        principalTable: "Challenge",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChallengeExercise_Exercises_ExercisesId",
                        column: x => x.ExercisesId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AllianceChallenge_CompetitorsId",
                table: "AllianceChallenge",
                column: "CompetitorsId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeExercise_ExercisesId",
                table: "ChallengeExercise",
                column: "ExercisesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AllianceChallenge");

            migrationBuilder.DropTable(
                name: "ChallengeExercise");

            migrationBuilder.DropTable(
                name: "Challenge");
        }
    }
}
