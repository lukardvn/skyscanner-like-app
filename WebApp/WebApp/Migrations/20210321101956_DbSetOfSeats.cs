using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class DbSetOfSeats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seat_DepartingFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seat_ReturningFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Seat_Flights_FlightId",
                table: "Seat");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Seat",
                table: "Seat");

            migrationBuilder.RenameTable(
                name: "Seat",
                newName: "Seats");

            migrationBuilder.RenameIndex(
                name: "IX_Seat_FlightId",
                table: "Seats",
                newName: "IX_Seats_FlightId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Seats",
                table: "Seats",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Seats_DepartingFlightSeatId",
                table: "Reservations",
                column: "DepartingFlightSeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Seats_ReturningFlightSeatId",
                table: "Reservations",
                column: "ReturningFlightSeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seats_DepartingFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Seats_ReturningFlightSeatId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Seats_Flights_FlightId",
                table: "Seats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Seats",
                table: "Seats");

            migrationBuilder.RenameTable(
                name: "Seats",
                newName: "Seat");

            migrationBuilder.RenameIndex(
                name: "IX_Seats_FlightId",
                table: "Seat",
                newName: "IX_Seat_FlightId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Seat",
                table: "Seat",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Seat_Flights_FlightId",
                table: "Seat",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
