using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Migrations
{
    public partial class Invitation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserSendingId = table.Column<int>(nullable: false),
                    UserReceivingId = table.Column<int>(nullable: false),
                    DepartingFlightId = table.Column<int>(nullable: true),
                    ReturningFlightId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invitations_Flights_DepartingFlightId",
                        column: x => x.DepartingFlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Flights_ReturningFlightId",
                        column: x => x.ReturningFlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_DepartingFlightId",
                table: "Invitations",
                column: "DepartingFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_ReturningFlightId",
                table: "Invitations",
                column: "ReturningFlightId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invitations");
        }
    }
}
