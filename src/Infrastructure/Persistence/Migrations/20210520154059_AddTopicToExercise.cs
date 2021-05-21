using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.Persistence.Migrations
{
    public partial class AddTopicToExercise : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Topic",
                table: "Exercises",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Topic",
                table: "Exercises");
        }
    }
}
