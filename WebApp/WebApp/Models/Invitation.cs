using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Invitation
    {
        public int Id { get; set; }
        public int? UserSendingId { get; set; }
        public int? UserReceivingId { get; set; }

        [ForeignKey("UserSendingId")]
        public User UserSending { get; set; }
        [ForeignKey("UserReceivingId")]
        public User UserReceiving { get; set; }
        public Flight DepartingFlight { get; set; }
        public Flight ReturningFlight { get; set; }
        /*public int Id { get; set; }
        [Required]
        public int UserSendingId { get; set; }
        [Required]
        public User UserReceiving { get; set; }
        [Required]
        public Flight DepartingFlight { get; set; }
        public Flight ReturningFlight { get; set; }*/
    }
}
