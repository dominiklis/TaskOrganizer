using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class ConnectUserWithTasks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "TaskModels",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_TaskModels_UserId",
                table: "TaskModels",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskModels_AspNetUsers_UserId",
                table: "TaskModels",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskModels_AspNetUsers_UserId",
                table: "TaskModels");

            migrationBuilder.DropIndex(
                name: "IX_TaskModels_UserId",
                table: "TaskModels");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TaskModels");
        }
    }
}
