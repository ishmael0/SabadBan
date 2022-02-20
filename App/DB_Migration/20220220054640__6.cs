using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendee",
                table: "Vendee");

            migrationBuilder.DropIndex(
                name: "IX_Vendee_PhoneNumber",
                table: "Vendee");

            migrationBuilder.RenameTable(
                name: "Vendee",
                newName: "Vendees");

            migrationBuilder.RenameColumn(
                name: "PhoneNumberConfirm",
                table: "Vendees",
                newName: "CellPhoneConfirm");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Vendees",
                newName: "MelliCode");

            migrationBuilder.AddColumn<string>(
                name: "MelliCode",
                table: "Vendors",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CellPhone",
                table: "Vendees",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendees",
                table: "Vendees",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vendors_MelliCode",
                table: "Vendors",
                column: "MelliCode",
                unique: true,
                filter: "[MelliCode] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Vendees_CellPhone",
                table: "Vendees",
                column: "CellPhone",
                unique: true,
                filter: "[CellPhone] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Vendees_MelliCode",
                table: "Vendees",
                column: "MelliCode",
                unique: true,
                filter: "[MelliCode] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Vendors_MelliCode",
                table: "Vendors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendees",
                table: "Vendees");

            migrationBuilder.DropIndex(
                name: "IX_Vendees_CellPhone",
                table: "Vendees");

            migrationBuilder.DropIndex(
                name: "IX_Vendees_MelliCode",
                table: "Vendees");

            migrationBuilder.DropColumn(
                name: "MelliCode",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "CellPhone",
                table: "Vendees");

            migrationBuilder.RenameTable(
                name: "Vendees",
                newName: "Vendee");

            migrationBuilder.RenameColumn(
                name: "MelliCode",
                table: "Vendee",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "CellPhoneConfirm",
                table: "Vendee",
                newName: "PhoneNumberConfirm");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendee",
                table: "Vendee",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Vendee_PhoneNumber",
                table: "Vendee",
                column: "PhoneNumber",
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");
        }
    }
}
