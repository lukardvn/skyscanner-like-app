using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using WebApp.Data;
using WebApp.Services.AirlineService;
using WebApp.Services.DestinationService;
using WebApp.Services.FlightService;
using WebApp.Services.FriendshipService;
using WebApp.Services.ReservationService;
using WebApp.Services.UserService;
using Microsoft.OpenApi.Models;
using WebApp.Configs;
using WebApp.Services.InvitationService;
using WebApp.Services;

namespace WebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //var server = Configuration["DBServer"] ?? "ms-sql-server";
            /*var server = Configuration["DBServer"] ?? "ms-sql-server";
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "SA";
            var password = Configuration["DBPassword"] ?? "Pa55w0rd2019";*/

            //za v2-test
            var server = Configuration["DBServer"] ?? "avio-sql"; //mssql-service
            var port = Configuration["DBPort"] ?? "1433";
            var user = Configuration["DBUser"] ?? "SA";
            var password = Configuration["DBPassword"] ?? "MojaSifra2020";

            //var connString = $"Server={server},{port};Initial Catalog='AvioDb';User ID={user};Password={password};";
            System.Console.WriteLine($"Server={server},{port};Initial Catalog='AvioDb';User ID={user};Password={password};");
            services.AddDbContext<DataContext>(options => 
            options.UseSqlServer($"Server={server},{port};Initial Catalog='AvioDb';User ID={user};Password={password};"));

            //LOKALNO iz appsetings.json/////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddCors(options =>
                {
                    options.AddDefaultPolicy(
                        builder =>
                        {
                            //builder.WithOrigins("http://localhost:4200");
                            builder.AllowAnyOrigin();
                            builder.AllowAnyHeader();
                            builder.AllowAnyMethod();
                        });
                }); 
            var notificationMetadata = Configuration.GetSection("NotificationMetadata").Get<NotificationMetadata>();
            services.AddSingleton(notificationMetadata);
            
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
            });

            // HOSTED SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            //services.AddHostedService<SharedService>();

            services.AddAutoMapper(typeof(Startup));
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IFlightService, FlightService>();
            services.AddScoped<IReservationService, ReservationService>();
            //da bismo znali current usera u svakom potrebnom trenutku
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddScoped<IFriendshipService, FriendshipService>();
            services.AddScoped<IAirlineService, AirlineService>();
            services.AddScoped<IDestinationService, DestinationService>();
            services.AddScoped<IInvitationService, InvitationService>();
            //services.Configure<EmailParameters>(Configuration.GetSection("EmailParameters"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            PrepDB.PrepPopulation(app);

            app.UseCors();

            app.UseAuthentication(); //IZNAD authorization

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
    }
}
