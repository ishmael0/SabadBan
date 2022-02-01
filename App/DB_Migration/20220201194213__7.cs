using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BankTitle",
                table: "VendorBankAccounts",
                newName: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_VendorBankAccounts_BankId",
                table: "VendorBankAccounts",
                column: "BankId");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorBankAccounts_Banks_BankId",
                table: "VendorBankAccounts",
                column: "BankId",
                principalTable: "Banks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorBankAccounts_Banks_BankId",
                table: "VendorBankAccounts");

            migrationBuilder.DropIndex(
                name: "IX_VendorBankAccounts_BankId",
                table: "VendorBankAccounts");

            migrationBuilder.RenameColumn(
                name: "BankId",
                table: "VendorBankAccounts",
                newName: "BankTitle");
        }
    }
}
