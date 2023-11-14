using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNamespace;

namespace backend
{
    class SeedAgenda
    {
        public static void Seedaccount(ForumContext db)
        {
            Account acc  = new Account();
            acc.ID = 1;
            acc.Name = "tesje";
            acc.Email = "tes@tes.nl";
           
            db.Accounts.Add(acc);
            db.SaveChanges();
        }
        public static void Seedagenda(ForumContext db)
        {
            Agenda agenda = new Agenda();
            agenda.AccountID = 1;
            agenda.Start_Date = DateTime.UtcNow;
            agenda.Subject = "testje";
            db.Agendas.Add(agenda);
            db.SaveChanges();
        }
    }
}
