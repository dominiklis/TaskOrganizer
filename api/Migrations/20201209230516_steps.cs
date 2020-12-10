using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class steps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "hasStartTime",
                table: "TaskModels",
                newName: "HasStartTime");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "TaskModels",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Steps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(nullable: false),
                    Completed = table.Column<bool>(nullable: false),
                    TaskId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Steps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Steps_TaskModels_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TaskModels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Steps_TaskId",
                table: "Steps",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Steps");

            migrationBuilder.RenameColumn(
                name: "HasStartTime",
                table: "TaskModels",
                newName: "hasStartTime");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "TaskModels",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
