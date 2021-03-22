using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApp.Data;
using WebApp.Services.InvitationService;

namespace WebApp.Services
{
    public class SharedService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IInvitationService _invitationService;

        public SharedService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
            //_invitationService = invitationService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
                    var myService = scope.ServiceProvider.GetRequiredService<IInvitationService>();

                    var toBeRemoved = dbContext.Invitations.Include(i => i.DepartingFlightSeat).Include(i => i.ReturningFlightSeat).Include(i => i.DepartingFlight)
                        .Where(invitation => invitation.TimeCreated.AddDays(3) < DateTime.Now || invitation.DepartingFlight.TakeoffTime.AddHours(3) < DateTime.Now)
                        .ToList();


                    foreach (var invitation in toBeRemoved)
                    {
                        //dbContext.Remove(invitation);
                        await myService.DeleteInvitation(invitation.Id);
                    }

                    await dbContext.SaveChangesAsync();
                    
                }

                await Task.Delay(TimeSpan.FromMinutes(5));
            }
        }
    }
}
