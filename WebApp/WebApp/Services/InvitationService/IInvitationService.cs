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
        Task<ServiceResponse<bool>> CreateInvitation(AddInvitationDto newInvitation);
        Task<ServiceResponse<List<Invitation>>> GetInvitations();
        Task<ServiceResponse<Invitation>> GetInvitation(int id);
        Task<ServiceResponse<bool>> DeleteInvitation(int id);
    }
}
