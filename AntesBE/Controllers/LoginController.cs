using Microsoft.AspNetCore.Mvc;
using YourNamespace;

namespace AntesBE.Controllers
{
    public class LoginController : Controller
    {
        [Route("Login/{email}")]
        [HttpGet]
        public IActionResult Login(string email, string wachtwoord) 
        {
            ForumContext db = new ForumContext();
            var x = db.Accounts.Where(x => x.Email.ToLower().Equals(email.ToLower())).FirstOrDefault(); // later hier agendas nemen tot ainde maand
            if (x != null)
            {
                return Ok(x);
            }
            return BadRequest();
            
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
