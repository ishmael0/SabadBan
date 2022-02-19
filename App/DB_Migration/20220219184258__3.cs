using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Host.DB_Migration
{
    public partial class _3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccountNumber",
                table: "VendorBankAccounts");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "VendorBankAccounts");

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Vendee",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "VendorWithdraws",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VendorBankAccountId = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<int>(type: "int", nullable: false),
                    Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    DateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Create = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VendorWithdraws", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VendorWithdraws_VendorBankAccounts_VendorBankAccountId",
                        column: x => x.VendorBankAccountId,
                        principalTable: "VendorBankAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vendee_PhoneNumber",
                table: "Vendee",
                column: "PhoneNumber",
                unique: true,
                filter: "[PhoneNumber] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_VendorWithdraws_VendorBankAccountId",
                table: "VendorWithdraws",
                column: "VendorBankAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VendorWithdraws");

            migrationBuilder.DropIndex(
                name: "IX_Vendee_PhoneNumber",
                table: "Vendee");

            migrationBuilder.AddColumn<string>(
                name: "AccountNumber",
                table: "VendorBankAccounts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "VendorBankAccounts",
                type: "nvarchar(16)",
                maxLength: 16,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "PhoneNumber",
                table: "Vendee",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);
        }
    }
}
