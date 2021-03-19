using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Invitation;
using WebApp.Models;

namespace WebApp.Services.InvitationService
{
    public class InvitationService : IInvitationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public InvitationService(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<ServiceResponse<bool>> CreateInvitation(AddInvitationDto newInvitation) //UserSendingID, UserReceiving, DepFlightID, RetFlightID
        {
            ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();

            try 
            {
                User userSending = await _context.Users.FirstOrDefaultAsync(u => u.Id == newInvitation.UserSendingId);
                User userReceiving = await _context.Users.FirstOrDefaultAsync(u => u.Id == newInvitation.UserReceiving.Id);
                Flight depFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newInvitation.DepartingFlightId);
                Flight retFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newInvitation.ReturningFlightId);

                //Invitation mappedInvite = _mapper.Map<Invitation>(newInvitation); //MAPPER JEDAN NE BI BIO LOS

                Invitation invite = new Invitation()
                {
                    UserSendingId = 0,
                    UserSending = userSending,
                    UserReceivingId = 0,
                    UserReceiving = userReceiving,
                    DepartingFlight = depFlight,
                    ReturningFlight = retFlight
                };

                _context.Invitations.Add(invite);
                await _context.SaveChangesAsync();

                serviceResponse.Data = true;
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;

                serviceResponse.Success = false;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<Invitation>>> GetInvitations()
        {
            ServiceResponse<List<Invitation>> serviceResponse = new ServiceResponse<List<Invitation>>();
            try
            {
                List<Invitation> dbInvitations = await _context.Invitations
                            .Include(r => r.UserReceiving).Include(r => r.UserSending).Include(r => r.DepartingFlight).Include(r => r.ReturningFlight)
                            .Where(r => r.UserReceiving.Id == GetUserId()).ToListAsync();
                serviceResponse.Data = dbInvitations;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Invitation>> GetInvitation(int id)
        {
            ServiceResponse<Invitation> serviceResponse = new ServiceResponse<Invitation>();
            try
            {
                Invitation invitation = await _context.Invitations
                                                .Include(i => i.DepartingFlight).Include(i => i.ReturningFlight)
                                                .Include(i => i.UserSending)
                                                .Include(i => i.UserReceiving)
                                                .FirstOrDefaultAsync(i => i.Id == id);
                if (invitation == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Invitation not found.";
                    return serviceResponse;
                }

                serviceResponse.Data = invitation;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteInvitation(int id)
        {
            ServiceResponse<bool> serviceResponse = new ServiceResponse<bool>();
            try
            {
                Invitation dbInvitation = await _context.Invitations.FirstOrDefaultAsync(r => r.Id == id);
                if (dbInvitation == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Invitation not found.";
                    return serviceResponse;
                }

                _context.Invitations.Remove(dbInvitation);
                await _context.SaveChangesAsync();
                serviceResponse.Data = true;
                
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
    }
}
