using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApp.Configs;
using WebApp.Models;

namespace WebApp.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration; //da bismo mogli pristupiti kljucu iz appsetings.json
        //private readonly EmailParameters _emailConfig;

        //injecting DataContext
        public AuthRepository(DataContext context, IConfiguration configuration/*, EmailParameters emailConfig*/)
        {
            _context = context;
            _configuration = configuration;
            //_emailConfig = emailConfig;
        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();

            if (await UserExists(user.Email))
            {
                response.Success = false;
                response.Message = "User already exists";
                return response;
            }

            //koristimo da ne bismo slali password kao string, nije bezbedno
            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            response.Data = user.Id;

            #region email 
            string emailData = "http:localhost:4200/confirm/" + user.Id;
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Email confirmation", "webapp@example.com"));
            message.To.Add(new MailboxAddress("Luka", "rluka996@gmail.com"));
            message.Subject = "Email confirmation";

            var body = new StringBuilder();
            body.AppendLine("Click the link to complete your registration proccess and activate your account: ");
            body.AppendFormat("<a href=\"http://localhost:4200/confirm/{0}\">Confirm email address</a>", user.Id);
            message.Body = new TextPart("html") { Text = body.ToString() };

            //message.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = "<a href=\"" + emailData + "\"" + ">Confirm your acccount.</a>" };

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                //SMTP server authentication if needed
                client.Authenticate("rluka996@gmail.com", "kostadin");
                client.Send(message);
                client.Disconnect(true);
            }
            #endregion email

            return response;
        }

        public async Task<ServiceResponse<string>> Login(string username, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower().Equals(username.ToLower()));
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found.";
            } 
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Wrong password.";
            }
            else if (user.EmailConfirmed == false)
            {
                response.Success = false;
                response.Message = "Email not confirmed.";
            }
            else
            {
                response.Data = CreateToken(user);
            }

            return response;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Email.ToLower() == username.ToLower()))
                return true;

            return false;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            /*kreiranjem instance HMACSHA512 klase automatski se generise kljuc
              koji se moze koristiti kao passwordSalt */
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }

                return true;
            }
        }

        private string CreateToken(User user)   //jwt.io za rasparcavanje tokena
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),   //id korisnika
                new Claim(ClaimTypes.Email, user.Email), //email korisnika, moze i unique_name da se koristi
                new Claim(ClaimTypes.Role, user.Type.ToString())
            };

            //uzimamo kljuc iz appsetings.json
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            //tim kljucem, uz pomoc hmacsha512 generisemo kredencijale
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //koriscenjem kredencijala pravimo token deskriptor sa claim-ovima i datumom isticanja
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            //tokenHandler generise token od deskriptora
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task ConfirmEmail(int id)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.EmailConfirmed == false);
            user.EmailConfirmed = true;
            await _context.SaveChangesAsync();
        }
    }
}
