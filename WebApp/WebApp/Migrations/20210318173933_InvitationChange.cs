﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class InvitationChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Flights_DepartingFlightId",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Flights_ReturningFlightId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_DepartingFlightId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_ReturningFlightId",
                table: "Invitations");

            migrationBuilder.AlterColumn<int>(
                name: "ReturningFlightId",
                table: "Invitations",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DepartingFlightId",
                table: "Invitations",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ReturningFlightId",
                table: "Invitations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "DepartingFlightId",
                table: "Invitations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_DepartingFlightId",
                table: "Invitations",
                column: "DepartingFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ReturningFlightId",
                table: "Invitations",
                column: "ReturningFlightId");

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
        }
    }
}
