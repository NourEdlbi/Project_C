﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using YourNamespace;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(ForumContext))]
    partial class ForumContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("YourNamespace.Account", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<bool>("Admin")
                        .HasColumnType("boolean");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("YourNamespace.Agenda", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("AccountID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("End_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("End_Time")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Start_Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Start_Time")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("AccountID");

                    b.ToTable("Agendas");
                });

            modelBuilder.Entity("YourNamespace.Answer", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("QuizResultID")
                        .HasColumnType("integer");

                    b.Property<char>("Value")
                        .HasColumnType("character(1)");

                    b.HasKey("ID");

                    b.HasIndex("QuizResultID");

                    b.ToTable("Answer");
                });

            modelBuilder.Entity("YourNamespace.Comment", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("CommenterID")
                        .HasColumnType("integer");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ForumID")
                        .HasColumnType("integer");

                    b.Property<DateTime>("PostTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.HasIndex("ForumID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("YourNamespace.Forum", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ForumPosterID")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("PostTime")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.ToTable("Forums");
                });

            modelBuilder.Entity("YourNamespace.Profile", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("AccountID")
                        .HasColumnType("integer");

                    b.Property<string>("Bio")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Contact")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ID");

                    b.HasIndex("AccountID")
                        .IsUnique();

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("YourNamespace.Question", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<char>("Answer")
                        .HasColumnType("character(1)");

                    b.Property<string>("QuestionText")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("QuizID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("QuizID");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("YourNamespace.Quiz", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("QuizCreatorID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("YourNamespace.QuizResult", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<int>("QuizID")
                        .HasColumnType("integer");

                    b.Property<int>("QuizSubmitterID")
                        .HasColumnType("integer");

                    b.HasKey("ID");

                    b.HasIndex("QuizID");

                    b.HasIndex("QuizSubmitterID");

                    b.ToTable("QuizResults");
                });

            modelBuilder.Entity("YourNamespace.Agenda", b =>
                {
                    b.HasOne("YourNamespace.Account", "Account")
                        .WithMany("Agendas")
                        .HasForeignKey("AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("YourNamespace.Answer", b =>
                {
                    b.HasOne("YourNamespace.QuizResult", "QuizResult")
                        .WithMany("Answers")
                        .HasForeignKey("QuizResultID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("QuizResult");
                });

            modelBuilder.Entity("YourNamespace.Comment", b =>
                {
                    b.HasOne("YourNamespace.Forum", "Forum")
                        .WithMany("Comments")
                        .HasForeignKey("ForumID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Forum");
                });

            modelBuilder.Entity("YourNamespace.Profile", b =>
                {
                    b.HasOne("YourNamespace.Account", "Account")
                        .WithOne("Profile")
                        .HasForeignKey("YourNamespace.Profile", "AccountID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("YourNamespace.Question", b =>
                {
                    b.HasOne("YourNamespace.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("YourNamespace.QuizResult", b =>
                {
                    b.HasOne("YourNamespace.Quiz", "Quiz")
                        .WithMany("QuizResults")
                        .HasForeignKey("QuizID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("YourNamespace.Account", "QuizSubmitter")
                        .WithMany("QuizResults")
                        .HasForeignKey("QuizSubmitterID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Quiz");

                    b.Navigation("QuizSubmitter");
                });

            modelBuilder.Entity("YourNamespace.Account", b =>
                {
                    b.Navigation("Agendas");

                    b.Navigation("Profile")
                        .IsRequired();

                    b.Navigation("QuizResults");
                });

            modelBuilder.Entity("YourNamespace.Forum", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("YourNamespace.Quiz", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("QuizResults");
                });

            modelBuilder.Entity("YourNamespace.QuizResult", b =>
                {
                    b.Navigation("Answers");
                });
#pragma warning restore 612, 618
        }
    }
}
