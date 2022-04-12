using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Enums;

namespace WebApp.Models
{
    public class User
    {
        public int Id { get; set; }
        //public string User_id  { get; set; }
        public string ExternalId { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        //public string Password { get; set; }
        //public byte[] PasswordHash { get; set; }
        //public byte[] PasswordSalt { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<Friendship> Friendships { get; set; }
        [InverseProperty("UserSending")]
        public List<Invitation> InvitationsSent { get; set; }
        [InverseProperty("UserReceiving")]
        public List<Invitation> InvitationsReceived { get; set; }
        public UserType Type { get; set; } = UserType.regular;
        public Airline Airline { get; set; } = null;
        public bool EmailConfirmed { get; set; } = false;
    }
}