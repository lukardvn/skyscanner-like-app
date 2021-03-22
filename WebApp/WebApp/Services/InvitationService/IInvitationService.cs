using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Invitation;
using WebApp.Models;

namespace WebApp.Services.InvitationService
{
    public interface IInvitationService
    {
        Task<ServiceResponse<Invitation>> CreateInvitation(AddInvitationDto newInvitation);
        Task<ServiceResponse<List<Invitation>>> GetInvitations();
        Task<ServiceResponse<Invitation>> GetInvitation(int id);
        Task<ServiceResponse<Invitation>> DeleteInvitation(int id);
        Task<ServiceResponse<Seat>> FreeSeatFromHold(Seat seat);
        Task<ServiceResponse<Seat>> TakeSeatFromHold(Seat seat);
        Task<ServiceResponse<Seat>> HoldSeat(Seat seat);

    }
}
