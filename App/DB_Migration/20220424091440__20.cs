using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackHost.DB_Migration
{
    public partial class _20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorSells_Vendors_VendorId",
                table: "VendorSells");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorSells",
                table: "VendorSells");

            migrationBuilder.RenameTable(
                name: "VendorSells",
                newName: "VendorDetails");

            migrationBuilder.RenameIndex(
                name: "IX_VendorSells_VendorId",
                table: "VendorDetails",
                newName: "IX_VendorDetails_VendorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorDetails",
                table: "VendorDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorDetails_Vendors_VendorId",
                table: "VendorDetails",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorDetails_Vendors_VendorId",
                table: "VendorDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorDetails",
                table: "VendorDetails");

            migrationBuilder.RenameTable(
                name: "VendorDetails",
                newName: "VendorSells");

            migrationBuilder.RenameIndex(
                name: "IX_VendorDetails_VendorId",
                table: "VendorSells",
                newName: "IX_VendorSells_VendorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorSells",
                table: "VendorSells",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorSells_Vendors_VendorId",
                table: "VendorSells",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
