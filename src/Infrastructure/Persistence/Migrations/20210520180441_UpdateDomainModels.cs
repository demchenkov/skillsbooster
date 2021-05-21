using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class UpdateDomainModels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Score",
                table: "Submissions",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddColumn<int>(
                name: "ChallengeId",
                table: "Submissions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DuelId",
                table: "Submissions",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallengeId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DuelId",
                table: "Submissions");

            migrationBuilder.AlterColumn<float>(
                name: "Score",
                table: "Submissions",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
