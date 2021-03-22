using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class SeatReservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartingFlightSeatId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReturningFlightSeatId",
                table: "Reservations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_DepartingFlightSeatId",
                table: "Reservations",
                column: "DepartingFlightSeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_ReturningFlightSeatId",
                table: "Reservations",
                column: "ReturningFlightSeatId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Seat_DepartingFlightSeatId",
                table: "Reservations",
                column: "DepartingFlightSeatId",
                principalTable: "Seat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Seat_ReturningFlightSeatId",
                table: "Reservations",
                column: "ReturningFlightSeatId",
                principalTable: "Seat",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seat_DepartingFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seat_ReturningFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_DepartingFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_ReturningFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "DepartingFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "ReturningFlightSeatId",
                table: "Reservations");
        }
    }
}
