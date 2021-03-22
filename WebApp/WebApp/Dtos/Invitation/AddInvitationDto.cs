using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Invitation
{
    public class AddInvitationDto
    {
        //public int Id { get; set; }
        public int UserSendingId { get; set; }
        public Models.User UserReceiving { get; set; }
        public int DepartingFlightId { get; set; }
        public int DepartingFlightSeatId { get; set; }
        public int ReturningFlightId { get; set; }
        public int ReturningFlightSeatId { get; set; }
    }
}
