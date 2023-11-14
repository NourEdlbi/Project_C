
using backend;
using YourNamespace;
class Program
{
    static void Main()
    {
        ForumContext db = new ForumContext();
        SeedAgenda.Seedaccount(db);
        SeedAgenda.Seedagenda(db);


        AgendaManager.getagendaitems(db);



    }
}
