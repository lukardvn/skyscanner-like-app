﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Account
    {
        public string Id { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
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