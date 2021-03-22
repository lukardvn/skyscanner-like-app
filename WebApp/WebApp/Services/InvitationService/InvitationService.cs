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
using WebApp.Models.Enums;

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

        public async Task<ServiceResponse<Invitation>> CreateInvitation(AddInvitationDto newInvitation) 
                                                //UserSendingID, UserReceiving, DepFlightID, DepartingFlightSeatId, RetFlightID, ReturningFLightSeatId
        {
            ServiceResponse<Invitation> serviceResponse = new ServiceResponse<Invitation>();

            try 
            {
                User userSending = await _context.Users.FirstOrDefaultAsync(u => u.Id == newInvitation.UserSendingId);
                User userReceiving = await _context.Users.FirstOrDefaultAsync(u => u.Id == newInvitation.UserReceiving.Id);
                Flight depFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newInvitation.DepartingFlightId);
                Flight retFlight = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newInvitation.ReturningFlightId);
                Seat depSeat = await _context.Seats.FirstOrDefaultAsync(s => s.Id == newInvitation.DepartingFlightSeatId);
                Seat retSeat = await _context.Seats.FirstOrDefaultAsync(s => s.Id == newInvitation.ReturningFlightSeatId);

                //Invitation mappedInvite = _mapper.Map<Invitation>(newInvitation); //MAPPER JEDAN NE BI BIO LOS

                Invitation invite = new Invitation()
                {
                    UserSendingId = 0,
                    UserSending = userSending,
                    UserReceivingId = 0,
                    UserReceiving = userReceiving,
                    DepartingFlight = depFlight,
                    ReturningFlight = retFlight,
                    DepartingFlightSeat = depSeat,
                    ReturningFlightSeat = retSeat,
                    TimeCreated = DateTime.Now
                };

                _context.Invitations.Add(invite);
                await _context.SaveChangesAsync();

                serviceResponse.Data = invite;
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
                                                .Include(i => i.DepartingFlightSeat).Include(i => i.ReturningFlightSeat)
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

        public async Task<ServiceResponse<Invitation>> DeleteInvitation(int id)
        {
            ServiceResponse<Invitation> serviceResponse = new ServiceResponse<Invitation>();
            try
            {
                Invitation dbInvitation = await _context.Invitations.Include(i => i.DepartingFlightSeat).Include(i => i.ReturningFlightSeat)
                            .FirstOrDefaultAsync(r => r.Id == id);

                if (dbInvitation == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Invitation not found.";
                    return serviceResponse;
                }

                _context.Invitations.Remove(dbInvitation);
                await _context.SaveChangesAsync();

                Invitation forResponse = dbInvitation;
                serviceResponse.Data = forResponse;
                //serviceResponse.Data = true;

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Seat>> FreeSeatFromHold(Seat seat)
        {
            ServiceResponse<Seat> serviceResponse = new ServiceResponse<Seat>();

            try
            {
                Seat dbSeat = await _context.Seats.FirstOrDefaultAsync(s => s.Id == seat.Id);

                if (dbSeat == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Seat not found.";
                    return serviceResponse;
                }

                dbSeat.State = SeatState.FREE;  // hold => free

                _context.Seats.Update(dbSeat);
                await _context.SaveChangesAsync();
                serviceResponse.Data = dbSeat;

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Seat>> TakeSeatFromHold(Seat seat)
        {
            ServiceResponse<Seat> serviceResponse = new ServiceResponse<Seat>();

            try
            {
                Seat dbSeat = await _context.Seats.FirstOrDefaultAsync(s => s.Id == seat.Id);

                if (dbSeat == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Seat not found.";
                    return serviceResponse;
                }

                dbSeat.State = SeatState.TAKEN;  // hold => taken

                _context.Seats.Update(dbSeat);
                await _context.SaveChangesAsync();
                serviceResponse.Data = dbSeat;

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Seat>> HoldSeat(Seat seat)
        {
            ServiceResponse<Seat> serviceResponse = new ServiceResponse<Seat>();

            try
            {
                Seat dbSeat = await _context.Seats.FirstOrDefaultAsync(s => s.Id == seat.Id);

                if (dbSeat == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Seat not found.";
                    return serviceResponse;
                }

                dbSeat.State = SeatState.HOLD;  // hold => taken

                _context.Seats.Update(dbSeat);
                await _context.SaveChangesAsync();
                serviceResponse.Data = dbSeat;

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
