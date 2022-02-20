using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VendeeId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VendorId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_VendeeId",
                table: "Invoices",
                column: "VendeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_VendorId",
                table: "Invoices",
                column: "VendorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Vendees_VendeeId",
                table: "Invoices",
                column: "VendeeId",
                principalTable: "Vendees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_Vendors_VendorId",
                table: "Invoices",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Vendees_VendeeId",
                table: "Invoices");

            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_Vendors_VendorId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_VendeeId",
                table: "Invoices");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_VendorId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "VendeeId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "VendorId",
                table: "Invoices");
        }
    }
}
