using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class InvitationChange3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserSendingId",
                table: "Invitations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ReturningFlightId",
                table: "Invitations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "DepartingFlightId",
                table: "Invitations",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_DepartingFlightId",
                table: "Invitations",
                column: "DepartingFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ReturningFlightId",
                table: "Invitations",
                column: "ReturningFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_UserSendingId",
                table: "Invitations",
                column: "UserSendingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Flights_DepartingFlightId",
                table: "Invitations",
                column: "DepartingFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Flights_ReturningFlightId",
                table: "Invitations",
                column: "ReturningFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_UserSendingId",
                table: "Invitations",
                column: "UserSendingId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Flights_DepartingFlightId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Flights_ReturningFlightId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_UserSendingId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_DepartingFlightId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_ReturningFlightId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_UserSendingId",
                table: "Invitations");

            migrationBuilder.AlterColumn<int>(
                name: "UserSendingId",
                table: "Invitations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ReturningFlightId",
                table: "Invitations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DepartingFlightId",
                table: "Invitations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
