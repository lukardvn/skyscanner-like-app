using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Dtos.Reservation;
using WebApp.Models;
using MailKit.Net.Smtp;
using MimeKit;
using System.Data;
using WebApp.Models.Enums;

namespace WebApp.Services.ReservationService
{
    public class ReservationService : IReservationService
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public ReservationService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }

        //da bismo dobavili trenutnog korisnika
        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));

        public async Task<ServiceResponse<List<Reservation>>> GetAllReservations()
        {   //dobavlja sve rezervacije TRENUTNOG korisnika
            ServiceResponse<List<Reservation>> serviceResponse = new ServiceResponse<List<Reservation>>();
            try
            {
                List<Reservation> dbReservations = await _context.Reservations
                            .Include(r => r.User).Include(r => r.DepartingFlight).Include(r => r.ReturningFlight)
                            .Where(r => r.User.Id == GetUserId()).ToListAsync();
                serviceResponse.Data = dbReservations;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<Reservation>> AddReservation(AddReservationDto newReservation)
        {
            ServiceResponse<Reservation> serviceResponse = new ServiceResponse<Reservation>();
            try
            {
                #region nzm
                //prvo provera da li ima mesta na letovima
                /*Flight dbDeparting = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newReservation.DepartingFlight.Id);
                if (dbDeparting.SeatsLeft == 0) //nema mesta vise
                {
                    serviceResponse.Message = "There's no more seats left at this aircraft.";
                    serviceResponse.Success = false;
                    return serviceResponse;
                }
                else
                {
                    dbDeparting.SeatsLeft--;//samo za jedan, jer nije implementirano za vise korisnika odjednom
                    _context.Flights.Update(dbDeparting);
                    await _context.SaveChangesAsync();
                }

                if (newReservation.ReturningFlight != null)
                {
                    Flight dbReturning = await _context.Flights.FirstOrDefaultAsync(f => f.Id == newReservation.ReturningFlight.Id);
                    if (dbReturning.SeatsLeft == 0) //nema mesta vise
                    {
                        serviceResponse.Message = "There's no more seats left at this aircraft.";
                        serviceResponse.Success = false;
                        return serviceResponse;
                    }
                    else
                    {
                        dbReturning.SeatsLeft--;
                        _context.Flights.Update(dbReturning);
                        await _context.SaveChangesAsync();
                    }
                }*/
                #endregion nzm

                User user = await _context.Users.Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id == GetUserId());
                newReservation.User = user;

                // OVO JE NOVO
                Seat departingSeat = await _context.Seats.AsNoTracking().FirstOrDefaultAsync(s => s.Id == newReservation.DepartingFlightSeat.Id);
                //departingSeat.State = SeatState.TAKEN;
                newReservation.DepartingFlightSeat = departingSeat;

                if (newReservation.ReturningFlightSeat != null)
                {
                    Seat returningSeat = await _context.Seats.AsNoTracking().FirstOrDefaultAsync(s => s.Id == newReservation.ReturningFlightSeat.Id);
                    //returningSeat.State = SeatState.TAKEN;
                    newReservation.ReturningFlightSeat = returningSeat;
                }
                
                Reservation reservation = _mapper.Map<Reservation>(newReservation);
                
                user.Reservations.Add(reservation);
                /*_context.Seats.Update(newReservation.DepartingFlightSeat);
                if (newReservation.ReturningFlightSeat != null)
                    _context.Seats.Update(newReservation.ReturningFlightSeat);*/

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                Reservation forResponse = _mapper.Map<Reservation>(newReservation);
                serviceResponse.Data = forResponse;
                #region email
                //poslati imejl
                string pattern = @"Reservation details..
                                   Flight #1 : Origin: {0} | Destination: {1} | Takeoff time: {2} | Landing time: {3} | Duration: {4}.
                                   ";

                string emailData = string.Format(pattern, newReservation.DepartingFlight.Origin, newReservation.DepartingFlight.Destination,
                    newReservation.DepartingFlight.TakeoffTime, newReservation.DepartingFlight.LandingTime, newReservation.DepartingFlight.Duration);

                if (newReservation.ReturningFlight != null)
                {
                    string pattern2 = @"
                                   Flight #2 : Origin: {0} | Destination: {1} | Takeoff time: {2} | Landing time: {3} | Duration: {4}.
                                   ";
                    string emailData2 = string.Format(pattern2, newReservation.ReturningFlight.Origin, newReservation.ReturningFlight.Destination,
                        newReservation.ReturningFlight.TakeoffTime, newReservation.ReturningFlight.LandingTime, newReservation.ReturningFlight.Duration);

                    emailData = emailData + emailData2;
                }

                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Booking details", "rluka996@gmail.com"));
                message.To.Add(new MailboxAddress("Luka", "rluka996@gmail.com"));
                message.Subject = "Booking details";
                message.Body = new TextPart("plain")
                {
                    Text = emailData
                };

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);

                    //SMTP server authentication if needed
                    client.Authenticate("rluka996", "kostadin");

                    client.Send(message);

                    client.Disconnect(true);
                }
                #endregion email
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                
                serviceResponse.Success = false;
            }
            return serviceResponse;

            #region druginacin
            /*
            ServiceResponse<List<Reservation>> serviceResponse = new ServiceResponse<List<Reservation>>();
            try
            {
                User user = await _context.Users.Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id == GetUserId());
                newReservation.User = user;
                Reservation reservation = _mapper.Map<Reservation>(newReservation);
                await _context.Reservations.AddAsync(reservation);
                //await _context.SaveChangesAsync();
                
                serviceResponse.Data = user.Reservations.ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                serviceResponse.Success = false;
            }
            return serviceResponse;
            */
            #endregion druginacin
        }

        public async Task<ServiceResponse<Reservation>> GetSingle(int id)
        {
            ServiceResponse<Reservation> serviceResponse = new ServiceResponse<Reservation>();
            try
            {
                Reservation reservation = await _context.Reservations.Include(r => r.DepartingFlight).ThenInclude(df => df.Airline)
                                                                     .Include(r => r.DepartingFlight).ThenInclude(df => df.Reviews).ThenInclude(rv => rv.User)
                                                                     .Include(r => r.ReturningFlight).ThenInclude(rf => rf.Airline)
                                                                     .Include(r => r.ReturningFlight).ThenInclude(df => df.Reviews).ThenInclude(rv => rv.User)
                                                                     .Include(r => r.ReturningFlightSeat).Include(r => r.DepartingFlightSeat)
                                                                     .Where(r => r.Id == id).FirstOrDefaultAsync();
                if (reservation == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Reservation not found.";
                    return serviceResponse;
                }
                serviceResponse.Data = reservation;

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<Reservation>> CancelReservation(int reservationId)
        {
            ServiceResponse<Reservation> serviceResponse = new ServiceResponse<Reservation>();
            try
            {
                Reservation dbReservation = await _context.Reservations.Include(r => r.DepartingFlight).Include(r => r.DepartingFlightSeat)
                                                .Include(r => r.ReturningFlight).Include(r => r.ReturningFlightSeat)
                                                .FirstOrDefaultAsync(r => r.Id == reservationId);
                if (dbReservation == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Reservation not found.";
                    return serviceResponse;
                }

                var currentTime = DateTime.Now;
                var timeLeft = dbReservation.DepartingFlight.TakeoffTime.Subtract(currentTime);
                if (timeLeft.TotalHours < 3)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Data = null;
                    serviceResponse.Message = "There is less then 3 hours left to the first flight.";
                }
                else //sve ok, brisi rezervaciju       OVDE BI TREBALO DA PROBAM DA IZMENIM I STATUS SEDISTA(ILI DVA)
                {
                    _context.Reservations.Remove(dbReservation);
                    await _context.SaveChangesAsync();

                    Reservation forResponse = dbReservation;

                    serviceResponse.Data = forResponse;
                }
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<Seat>> UpdateReservationSeatState(Seat seat)
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

                dbSeat.State = seat.State == SeatState.TAKEN ? SeatState.FREE : SeatState.TAKEN;

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

        public Task<ServiceResponse<Seat>> UpdateInvitationSeatState(Seat seat)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<Reservation>> AddReservationQuick(QuickReservationDto newReservation) //UserID, DepartingFlight
        {
            ServiceResponse<Reservation> serviceResponse = new ServiceResponse<Reservation>();

            try
            {
                User user = await _context.Users.Include(u => u.Reservations).FirstOrDefaultAsync(u => u.Id == GetUserId());
                newReservation.User = user;

                Flight depFlight = await _context.Flights.AsNoTracking().Include(f => f.Seats).FirstOrDefaultAsync(f => f.Id == newReservation.DepartingFlight.Id);
                var depSeats = depFlight.Seats.Where(s => s.State == 0); //ovde su mi sad slobodna mesta

                Random random = new Random();

                List<int> seatIds = new List<int>();
                foreach (Seat seat in depSeats)
                {
                    seatIds.Add(seat.Id);
                }
                int randomIndex = random.Next(0, seatIds.Count);

                var randomSeatId = seatIds[randomIndex];
                // OVO JE NOVO
                Seat departingSeat = await _context.Seats.AsNoTracking().FirstOrDefaultAsync(s => s.Id == randomSeatId);
                newReservation.DepartingFlightSeat = departingSeat;

                Reservation reservation = _mapper.Map<Reservation>(newReservation);

                user.Reservations.Add(reservation);

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                Reservation forResponse = _mapper.Map<Reservation>(newReservation);
                serviceResponse.Data = forResponse;
                #region email
                //poslati imejl
                string pattern = @"Reservation details..
                                   Flight #1 : Origin: {0} | Destination: {1} | Takeoff time: {2} | Landing time: {3} | Duration: {4}.
                                   ";

                string emailData = string.Format(pattern, newReservation.DepartingFlight.Origin, newReservation.DepartingFlight.Destination,
                    newReservation.DepartingFlight.TakeoffTime, newReservation.DepartingFlight.LandingTime, newReservation.DepartingFlight.Duration);


                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Booking details", "rluka996@gmail.com"));
                message.To.Add(new MailboxAddress("Luka", "rluka996@gmail.com"));
                message.Subject = "Booking details";
                message.Body = new TextPart("plain")
                {
                    Text = emailData
                };

                using (var client = new MailKit.Net.Smtp.SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, false);

                    //SMTP server authentication if needed
                    client.Authenticate("rluka996", "kostadin");

                    client.Send(message);

                    client.Disconnect(true);
                }
                #endregion email
            }
            catch (Exception ex)
            {
                serviceResponse.Message = ex.Message;
                
                serviceResponse.Success = false;
            }
            return serviceResponse;
        }
    }
}
