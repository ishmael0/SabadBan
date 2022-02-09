using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CellPhone1",
                table: "Vendors",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CellPhone2",
                table: "Vendors",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Images",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone1",
                table: "Vendors",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone2",
                table: "Vendors",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCOde",
                table: "Vendors",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShortDescription",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CellPhone1",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "CellPhone2",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Images",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Phone1",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "Phone2",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "PostalCOde",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "ShortDescription",
                table: "Vendors");
        }
    }
}
