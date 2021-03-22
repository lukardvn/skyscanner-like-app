using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Dtos.Reservation;
using WebApp.Models;

namespace WebApp.Services.ReservationService
{
    public interface IReservationService
    {
        Task<ServiceResponse<List<Reservation>>> GetAllReservations();
        Task<ServiceResponse<Reservation>> AddReservation(AddReservationDto newReservation);
        Task<ServiceResponse<Reservation>> GetSingle(int id);
        Task<ServiceResponse<Reservation>> CancelReservation(int reservationId);
        Task<ServiceResponse<Seat>> UpdateReservationSeatState(Seat seat);
        Task<ServiceResponse<Reservation>> AddReservationQuick(QuickReservationDto newReservation);
        //Task<ServiceResponse<Seat>> UpdateInvitationSeatState(Seat seat);
    }
}
