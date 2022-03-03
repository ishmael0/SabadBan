using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PostCost",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PostType",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PostCost",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PostType",
                table: "Invoices");
        }
    }
}
