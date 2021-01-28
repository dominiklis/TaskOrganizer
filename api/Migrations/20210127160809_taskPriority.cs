using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class taskPriority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "Priority",
                table: "TaskModels",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "TaskModels");
        }
    }
}
