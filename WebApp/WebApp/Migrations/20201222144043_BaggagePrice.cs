using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class BaggagePrice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BaggageInfo",
                table: "Airlines");

            migrationBuilder.AddColumn<string>(
                name: "BaggagePrice",
                table: "Airlines",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BaggagePrice",
                table: "Airlines");

            migrationBuilder.AddColumn<string>(
                name: "BaggageInfo",
                table: "Airlines",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
