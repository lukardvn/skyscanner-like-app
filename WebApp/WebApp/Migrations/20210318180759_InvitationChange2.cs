using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class InvitationChange2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserReceivingId",
                table: "Invitations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_UserReceivingId",
                table: "Invitations",
                column: "UserReceivingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_UserReceivingId",
                table: "Invitations",
                column: "UserReceivingId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_UserReceivingId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_UserReceivingId",
                table: "Invitations");

            migrationBuilder.AlterColumn<int>(
                name: "UserReceivingId",
                table: "Invitations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
