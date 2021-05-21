using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class AddRankingViews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserRequests_AllianceId",
                table: "UserRequests");

            migrationBuilder.DropIndex(
                name: "IX_ChallengeRequests_AllianceId",
                table: "ChallengeRequests");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRequests",
                table: "UserRequests",
                columns: new[] { "AllianceId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChallengeRequests",
                table: "ChallengeRequests",
                columns: new[] { "AllianceId", "ChallengeId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRequests",
                table: "UserRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChallengeRequests",
                table: "ChallengeRequests");

            migrationBuilder.CreateIndex(
                name: "IX_UserRequests_AllianceId",
                table: "UserRequests",
                column: "AllianceId");

            migrationBuilder.CreateIndex(
                name: "IX_ChallengeRequests_AllianceId",
                table: "ChallengeRequests",
                column: "AllianceId");
        }
    }
}
