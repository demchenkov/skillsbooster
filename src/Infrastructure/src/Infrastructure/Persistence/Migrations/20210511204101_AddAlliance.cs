using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SkillsBooster.Infrastructure.src.Infrastructure.Persistence.Migrations
{
    public partial class AddAlliance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AllianceId",
                table: "AppUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Alliances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(4000)", maxLength: 4000, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LeaderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alliances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Alliances_AppUsers_LeaderId",
                        column: x => x.LeaderId,
                        principalTable: "AppUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_AllianceId",
                table: "AppUsers",
                column: "AllianceId");

            migrationBuilder.CreateIndex(
                name: "IX_Alliances_LeaderId",
                table: "Alliances",
                column: "LeaderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppUsers_Alliances_AllianceId",
                table: "AppUsers",
                column: "AllianceId",
                principalTable: "Alliances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUsers_Alliances_AllianceId",
                table: "AppUsers");

            migrationBuilder.DropTable(
                name: "Alliances");

            migrationBuilder.DropIndex(
                name: "IX_AppUsers_AllianceId",
                table: "AppUsers");

            migrationBuilder.DropColumn(
                name: "AllianceId",
                table: "AppUsers");
        }
    }
}
