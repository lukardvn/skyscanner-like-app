using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Invitation;
using WebApp.Models;
using WebApp.Services.InvitationService;
using WebApp.Services.ReservationService;

namespace WebApp.Controllers
{
    [Route("invitations")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;
        private readonly IReservationService _reservationService;

        public InvitationController(IInvitationService invitationService, IReservationService reservationService)
        {
            _invitationService = invitationService;
            _reservationService = reservationService;
        }

        /*[HttpPost] // POST localhost:xx/invitations
        public async Task<IActionResult> Create(Invitation newInvitation)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _invitationService.CreateInvitation(newInvitation));
        }*/

        [HttpPost] // POST localhost:xx/invitations
        public async Task<IActionResult> Create(AddInvitationDto newInvitation)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(await _invitationService.CreateInvitation(newInvitation));
        }

        [HttpGet] //GET localhost/invitations
        public async Task<IActionResult> Get()
        {
            return Ok(await _invitationService.GetInvitations());
        }

        [HttpGet("{id}")] //GET localhost/invitations
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _invitationService.GetInvitation(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _invitationService.DeleteInvitation(id));
        }

        [HttpPut("TakeSeat")]
        public async Task<IActionResult> TakeSeat(Seat seat)
        {
            return Ok(await _invitationService.TakeSeatFromHold(seat));
        }

        [HttpPut("FreeSeat")]
        public async Task<IActionResult> FreeSeat(Seat seat)
        {
            return Ok(await _invitationService.FreeSeatFromHold(seat));
        }

        [HttpPut("HoldSeat")]
        public async Task<IActionResult> HoldSeat(Seat seat)
        {
            return Ok(await _invitationService.HoldSeat(seat));
        }

        /*[HttpPost("accept")]
        public async Task<IActionResult> Accept(Invitation invitation)
        {
            return Ok(await _reservationService.AddReservation(invitation));
        }*/
    }
}
