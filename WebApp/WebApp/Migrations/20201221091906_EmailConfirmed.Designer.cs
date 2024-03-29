﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApp.Data;

namespace WebApp.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20201221091906_EmailConfirmed")]
    partial class EmailConfirmed
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApp.Models.Airline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("WebApp.Models.AirlineDestination", b =>
                {
                    b.Property<int>("AirlineId")
                        .HasColumnType("int");

                    b.Property<int>("DestinationId")
                        .HasColumnType("int");

                    b.HasKey("AirlineId", "DestinationId");

                    b.HasIndex("DestinationId");

                    b.ToTable("AirlineDestinations");
                });

            modelBuilder.Entity("WebApp.Models.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("WebApp.Models.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<string>("Destination")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Distance")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Duration")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LandingTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("QuickReservation")
                        .HasColumnType("bit");

                    b.Property<int>("SeatsLeft")
                        .HasColumnType("int");

                    b.Property<string>("Stops")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TakeoffTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("WebApp.Models.Friendship", b =>
                {
                    b.Property<int>("UserId1")
                        .HasColumnType("int");

                    b.Property<int>("UserId2")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("UserId1", "UserId2");

                    b.HasIndex("UserId2");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("WebApp.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DepartingFlightId")
                        .HasColumnType("int");

                    b.Property<int?>("ReturningFlightId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DepartingFlightId");

                    b.HasIndex("ReturningFlightId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("WebApp.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FlightId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("WebApp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebApp.Models.AirlineDestination", b =>
                {
                    b.HasOne("WebApp.Models.Airline", "Airline")
                        .WithMany("AirlineDestinations")
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp.Models.Destination", "Destination")
                        .WithMany("AirlineDestinations")
                        .HasForeignKey("DestinationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApp.Models.Flight", b =>
                {
                    b.HasOne("WebApp.Models.Airline", "Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("WebApp.Models.Friendship", b =>
                {
                    b.HasOne("WebApp.Models.User", "User1")
                        .WithMany("Friendships")
                        .HasForeignKey("UserId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp.Models.User", "User2")
                        .WithMany()
                        .HasForeignKey("UserId2")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApp.Models.Reservation", b =>
                {
                    b.HasOne("WebApp.Models.Flight", "DepartingFlight")
                        .WithMany()
                        .HasForeignKey("DepartingFlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp.Models.Flight", "ReturningFlight")
                        .WithMany()
                        .HasForeignKey("ReturningFlightId");

                    b.HasOne("WebApp.Models.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApp.Models.Review", b =>
                {
                    b.HasOne("WebApp.Models.Flight", "Flight")
                        .WithMany("Reviews")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApp.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApp.Models.User", b =>
                {
                    b.HasOne("WebApp.Models.Airline", "Airline")
                        .WithMany("Admins")
                        .HasForeignKey("AirlineId");
                });
#pragma warning restore 612, 618
        }
    }
}
