using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class StepAuthor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Steps",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Steps_UserId",
                table: "Steps",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Steps_AspNetUsers_UserId",
                table: "Steps",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Steps_AspNetUsers_UserId",
                table: "Steps");

            migrationBuilder.DropIndex(
                name: "IX_Steps_UserId",
                table: "Steps");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Steps");
        }
    }
}
