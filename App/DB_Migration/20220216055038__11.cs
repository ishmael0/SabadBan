using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_VendorSells_VendorId",
                table: "VendorSells");

            migrationBuilder.CreateIndex(
                name: "IX_VendorSells_VendorId",
                table: "VendorSells",
                column: "VendorId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_VendorSells_VendorId",
                table: "VendorSells");

            migrationBuilder.CreateIndex(
                name: "IX_VendorSells_VendorId",
                table: "VendorSells",
                column: "VendorId");
        }
    }
}
