using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Text.Json;
using YourNamespace; // Replace with your actual namespace
using Konscious.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AntesBE.Controllers
{
    public class AgendaController : Controller
    {

        public record AgendaItem(int id, string title, string description, string date, string begintime, string endtime);

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
        public async Task<IActionResult> AddAgendaItem()
        {
            try
            {
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = await reader.ReadToEndAsync();
                    var agendaData = JsonSerializer.Deserialize<AgendaItem>(postData);

                    ForumContext db = new ForumContext();

                    var newAgendaItem = new Agenda
                    {
                        AccountID = agendaData.id,
                        Start_Date = DateTime.Parse(agendaData.date + "T" + agendaData.begintime).ToUniversalTime(),
                        End_Date = DateTime.Parse(agendaData.date + "T" + agendaData.endtime).ToUniversalTime(),
                        Start_Time = DateTime.Parse(agendaData.begintime).ToUniversalTime(),
                        End_Time = DateTime.Parse(agendaData.endtime).ToUniversalTime(),
                        Subject = agendaData.title,
                        Description = agendaData.description
                    };

                    db.Agendas.Add(newAgendaItem);
                    await db.SaveChangesAsync();

                    return Ok("Agenda item added successfully.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                // Replace 'YourLoggingMethod' with your actual logging mechanism (e.g., ILogger)
                Console.WriteLine($"Error adding agenda item: {ex}");

                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding agenda item.");
            }
        }
    }
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

