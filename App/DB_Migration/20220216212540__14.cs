using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ValidatorString",
                table: "Banks",
                newName: "ShebaValidator");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumberValidator",
                table: "Banks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardValidator",
                table: "Banks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountNumberValidator",
                table: "Banks");

            migrationBuilder.DropColumn(
                name: "CardValidator",
                table: "Banks");

            migrationBuilder.RenameColumn(
                name: "ShebaValidator",
                table: "Banks",
                newName: "ValidatorString");
        }
    }
}
