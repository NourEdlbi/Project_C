using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNamespace;

namespace backend
{
    class SeedDB
    {
        public static void cleardb(ForumContext db)
        {
            foreach (var item in db.Accounts)
            {
                db.Accounts.Remove(item);
            }
            foreach (var item in db.Questions)
            {
                db.Questions.Remove(item);
            }
            foreach (var item in db.QuizResults)
            {
                db.QuizResults.Remove(item);
            }
            foreach (var item in db.Comments)
            {
                db.Comments.Remove(item);
            }
            foreach (var item in db.Agendas)
            {
                db.Agendas.Remove(item);
            }
            db.SaveChanges();
        }

        public static void Seedaccount(ForumContext db)
        {
            Account acc  = new Account();
            acc.ID = 1;
            acc.Name = "tessssssje";
            acc.Email = "tes@te.nl";
            acc.Password = "password";

            Account acc1 = new Account();
            acc1.ID = 2;
            acc1.Name = "tessje";
            acc1.Email = "te@tes.nl";
            acc1.Password = "password";

            Account acc2 = new Account();
            acc2.ID = 3;
            acc2.Name = "tessssje";
            acc2.Email = "ts@tes.nl";
            acc2.Password = "password";

            Account acc3 = new Account();
            acc3.ID = 4;
            acc3.Name = "sje";
            acc3.Email = "tes@ts.nl";
            acc3.Password = "password";

            Account acc4 = new Account();
            acc4.ID = 5;
            acc4.Name = "User";
            acc4.Email = "user@antes.nl";
            acc4.Password = "Welkom0";

            Account acc5 = new Account();
            acc5.ID = 6;
            acc5.Name = "Admin";
            acc5.Email = "admin@antes.nl";
            acc5.Password = "Welkom1";
            acc5.Admin = true;  

            db.Accounts.AddRange(acc, acc1, acc2, acc3, acc4, acc5);
            db.SaveChanges();
        }

        public static void SeedProfiles(ForumContext db)
        {
            Profile prof1 = new Profile();
            prof1.ID = 1;
            prof1.AccountID = 1;
            prof1.Bio = "";
            prof1.Contact = "tes@te.nl";
            
            db.Profiles.Add(prof1); 
            db.SaveChanges();

        }

        public static void Seedagenda(ForumContext db)
        {
            Agenda agenda = new Agenda();
            agenda.AccountID = 1;
            agenda.Start_Date = DateTime.UtcNow;
            agenda.Subject = "tstje";

            Agenda agenda1 = new Agenda();
            agenda1.AccountID = 2;
            agenda1.Start_Date = DateTime.UtcNow;
            agenda1.Subject = "tesssssstjssssssssssse";

            Agenda agenda2 = new Agenda();
            agenda2.AccountID = 3;
            agenda2.Start_Date = DateTime.UtcNow;
            agenda2.Subject = "tesstje";

            Agenda agenda3 = new Agenda();
            agenda3.AccountID = 4;
            agenda3.Start_Date = DateTime.UtcNow;
            agenda3.Subject = "tesssssstje"; 

            db.Agendas.AddRange(agenda, agenda1, agenda2, agenda3);
            db.SaveChanges();
        }
    }
}
