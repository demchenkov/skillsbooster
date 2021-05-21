using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class AddRequestsLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChallengeRequests",
                columns: table => new
                {
                    ChallengeId = table.Column<int>(type: "int", nullable: false),
                    AllianceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_ChallengeRequests_Alliances_AllianceId",
                        column: x => x.AllianceId,
                        principalTable: "Alliances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ChallengeRequests_Challenges_ChallengeId",
                        column: x => x.ChallengeId,
                        principalTable: "Challenges",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserRequests",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AllianceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_UserRequests_Alliances_AllianceId",
                        column: x => x.AllianceId,
                        principalTable: "Alliances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserRequests_AppUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_AllianceId",
                table: "ChallengeRequests",
                column: "AllianceId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_ChallengeId",
                table: "ChallengeRequests",
                column: "ChallengeId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRequests_AllianceId",
                table: "UserRequests",
                column: "AllianceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRequests_UserId",
                table: "UserRequests",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChallengeRequests");

            migrationBuilder.DropTable(
                name: "UserRequests");
        }
    }
}
