using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YourNamespace;

namespace backend
{
    internal class AgendaManager
    {
        public static List<Agenda> getagendaitems(ForumContext db)
        {
            return db.Agendas.ToList();
        }

    }
}
