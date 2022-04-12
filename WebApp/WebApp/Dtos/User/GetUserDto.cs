using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.User
{
    public class GetUserDto
    {
        public int Id { get; set; }
        //public string User_id { get; set; }
        public string Email { get; set; }
        //public string Password { get; set; }
        //public byte[] PasswordHash { get; set; }
        //apublic byte[] PasswordSalt { get; set; }
        public string ExternalId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }

    }
}
