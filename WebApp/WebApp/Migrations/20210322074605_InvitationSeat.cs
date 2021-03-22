using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class InvitationSeat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartingFlightSeatId",
                table: "Invitations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReturningFlightSeatId",
                table: "Invitations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_DepartingFlightSeatId",
                table: "Invitations",
                column: "DepartingFlightSeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ReturningFlightSeatId",
                table: "Invitations",
                column: "ReturningFlightSeatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Seats_DepartingFlightSeatId",
                table: "Invitations",
                column: "DepartingFlightSeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Seats_ReturningFlightSeatId",
                table: "Invitations",
                column: "ReturningFlightSeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Seats_DepartingFlightSeatId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Seats_ReturningFlightSeatId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_DepartingFlightSeatId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_ReturningFlightSeatId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "DepartingFlightSeatId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "ReturningFlightSeatId",
                table: "Invitations");
        }
    }
}
