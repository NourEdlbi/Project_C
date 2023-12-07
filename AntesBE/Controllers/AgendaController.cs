using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using YourNamespace;

namespace AntesBE.Controllers
{
    public class AgendaController : Controller
    {

        public record AgendaItem(string title, string description, string date, string begintime, string endtime);

        // Endpoint to retrieve agenda items for a specific month
        [Route("Getagenda/{maand}")]
        [HttpGet]
        public IActionResult Getagenda(int maand)
        {
            ForumContext db = new ForumContext();
            var agendaItems = db.Agendas.Where(x => x.Start_Date.Month.Equals(maand)).ToList();
            return Ok(agendaItems);
        }

        // Add a new agenda item
        [HttpPost]
        [Route("AddAgendaItem")]
        public IActionResult AddAgendaItem([FromBody] AgendaItem agendaItem)
        {
            if (agendaItem == null)
            {
                return BadRequest("Invalid data. Please provide valid agenda item data.");
            }

            ForumContext db = new ForumContext();

            string userEmail = User.Identity.Name; // Retrieve the email of the authenticated user
            var account = db.Accounts.FirstOrDefault(a => a.Email == userEmail);

            if (account == null)
            {
                return BadRequest("User not found.");
            }


            // Creating a new Agenda item
            var newAgendaItem = new Agenda
            {
                AccountID = account.ID,
                Start_Date = DateTime.Parse(agendaItem.date), // Assuming the date format is acceptable without explicit conversion
                End_Date = DateTime.Parse(agendaItem.date),   // Set both Start_Date and End_Date as the provided date
                Start_Time = DateTime.Parse(agendaItem.begintime),
                End_Time = DateTime.Parse(agendaItem.endtime),
                Subject = agendaItem.title,
                Description = agendaItem.description
            };

            db.Agendas.Add(newAgendaItem);
            db.SaveChanges();

            return Ok("Agenda item added successfully.");
        }

        // Other CRUD operations (Details, Create, Edit, Delete) could be implemented similarly
        // Example methods are provided with comments
        
        // GET: AgendaController/Details/5
        // public ActionResult Details(int id)
        // {
        //     return View();
        // }

        // // GET: AgendaController/Create
        // public ActionResult Create()
        // {
        //     return View();
        // }

        // // POST: AgendaController/Create
        // [HttpPost]
        // [ValidateAntiForgeryToken]

        // // GET: AgendaController/Edit/5
        // public ActionResult Edit(int id)
        // {
        //     return View();
        // }

        // // POST: AgendaController/Edit/5
        // [HttpPost]
        // [ValidateAntiForgeryToken]

        // // GET: AgendaController/Delete/5
        // public ActionResult Delete(int id)
        // {
        //     return View();
        // }

        // // POST: AgendaController/Delete/5
        // [HttpPost]
        // [ValidateAntiForgeryToken]
    }
}
