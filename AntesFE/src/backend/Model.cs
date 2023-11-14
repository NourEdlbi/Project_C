using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace
{
    public class ForumContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Agenda> Agendas { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Forum> Forums { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizResult> QuizResults { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Forum to Comments: One-to-Many
            modelBuilder.Entity<Forum>()
                .HasMany(f => f.Comments)
                .WithOne(c => c.Forum)
                .HasForeignKey(c => c.ForumID)
                .OnDelete(DeleteBehavior.Cascade);

            // Account to Profile: One-to-One
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Profile)
                .WithOne(p => p.Account)
                .HasForeignKey<Profile>(p => p.AccountID)
                .OnDelete(DeleteBehavior.Cascade);

            // Account to Agendas: One-to-Many
            modelBuilder.Entity<Account>()
                .HasMany(a => a.Agendas)
                .WithOne(ag => ag.Account)
                .HasForeignKey(ag => ag.AccountID)
                .OnDelete(DeleteBehavior.Cascade);

            // Quiz to Questions: One-to-Many
            modelBuilder.Entity<Quiz>()
                .HasMany(q => q.Questions)
                .WithOne(qu => qu.Quiz)
                .HasForeignKey(qu => qu.QuizID)
                .OnDelete(DeleteBehavior.Cascade);

            // Quiz to QuizResults: One-to-Many
            modelBuilder.Entity<Quiz>()
                .HasMany(q => q.QuizResults)
                .WithOne(qr => qr.Quiz)
                .HasForeignKey(qr => qr.QuizID)
                .OnDelete(DeleteBehavior.Cascade);

            // Account to QuizResults as QuizSubmitter: One-to-Many
            modelBuilder.Entity<Account>()
                .HasMany(a => a.QuizResults)
                .WithOne(qr => qr.QuizSubmitter)
                .HasForeignKey(qr => qr.QuizSubmitterID)
                .OnDelete(DeleteBehavior.Cascade);

            // QuizResult to Answers: One-to-Many
            modelBuilder.Entity<QuizResult>()
                .HasMany(qr => qr.Answers)
                .WithOne(a => a.QuizResult)
                .HasForeignKey(a => a.QuizResultID)
                .OnDelete(DeleteBehavior.Cascade);

            //Logic with quiz:
            //A quiz has multiple Questions
            //A quiz has multiple quizresults (by people)
            //A quiz result has multiple answers (this fixes so you dont need json)
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("User ID = postgres; Password = a; Host = localhost; port = 5432; Database = Antes; Pooling = true");
            //optionsBuilder.LogTo(Console.WriteLine, Microsoft.Extensions.Logging.LogLevel.Debug);
            //optionsBuilder.EnableSensitiveDataLogging();

            // Apply migrations
        }
    }

    public class Account
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Admin { get; set; }

        public Profile Profile { get; set; }
        public ICollection<Agenda> Agendas { get; set; }
        public ICollection<QuizResult> QuizResults { get; set; }
    }

    public class Profile
    {
        [Key]
        public int ID { get; set; }
        public int AccountID { get; set; }
        public string Contact { get; set; }
        public string Bio { get; set; }

        public Account Account { get; set; }
    }

    public class Agenda
    {
        [Key]
        public int ID { get; set; }
        public int AccountID { get; set; }
        public DateTime Start_Date { get; set; }
        public DateTime End_Date { get; set; }
        public DateTime Start_Time { get; set; }
        public DateTime End_Time { get; set; }
        public string Subject { get; set; }

        public Account Account { get; set; }
    }

    public class Comment
    {
        [Key]
        public int ID { get; set; }
        public int ForumID { get; set; }
        public int CommenterID { get; set; }
        public string Content { get; set; }
        public DateTime PostTime { get; set; }

        public Forum Forum { get; set; }
    }

    public class Forum
    {
        [Key]
        public int ID { get; set; }
        public int ForumPosterID { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime PostTime { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
    public class Question
    {
        [Key]
        public int ID { get; set; }
        public int QuizID { get; set; }
        public string QuestionText { get; set; }
        public char Answer { get; set; }

        public Quiz Quiz { get; set; }
    }

    public class Quiz
    {
        [Key]
        public int ID { get; set; }
        public int QuizCreatorID { get; set; }

        public ICollection<Question> Questions { get; set; }
        public ICollection<QuizResult> QuizResults { get; set; }
    }

    public class Answer
    {
        [Key]
        public int ID { get; set; }
        public int QuizResultID { get; set; }
        public char Value { get; set; }
        public QuizResult QuizResult { get; set; }
    }

    public class QuizResult
    {
        [Key]
        public int ID { get; set; }
        public int QuizID { get; set; }
        public int QuizSubmitterID { get; set; }

        public Quiz Quiz { get; set; }
        public Account QuizSubmitter { get; set; }
        public ICollection<Answer> Answers { get; set; }
    }

    // Other classes remain the same.



}
