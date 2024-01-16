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
        [Route("Getagenda/{maand?}")]
        [HttpGet]
        public IActionResult Getagenda(int? maand)
        {
            try
            {
                ForumContext db = new ForumContext();
                var query = db.Agendas.AsQueryable();

                if (maand.HasValue)
                {
                    // Filter by month if maand is provided
                    query = query.Where(x => x.Start_Date.Month == maand.Value);
                }

                var agendaItems = query
                    .Select(item => new
                    {
                        id = item.AccountID,
                        title = item.Subject,
                        date = item.Start_Date.ToString("yyyy-MM-dd"),
                        begintime = item.Start_Time.ToString("HH:mm:ss"),
                        endtime = item.End_Time.ToString("HH:mm:ss"),
                        description = item.Description,
                    })
                    .ToList();

                return Ok(agendaItems);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching agenda items: {ex}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error fetching agenda items.");
            }
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
                Console.WriteLine($"Error adding agenda item: {ex}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error adding agenda item.");
            }
        }

        // ... (other code for CRUD operations)
    }
}
