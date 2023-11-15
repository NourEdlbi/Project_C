 using Microsoft.AspNetCore.Mvc;
using YourNamespace;
//import bcrypt from 'bcrypt';

namespace AntesBE.Controllers
{
    public class LoginController : Controller
    {
        [Route("Login")]
        [HttpPost]
        public IActionResult Login(string email, string wachtwoord) 
        {
            ForumContext db = new ForumContext();
            var x = db.Accounts.Where(x => x.Email.ToLower().Equals(email.ToLower())).FirstOrDefault(); // later hier agendas nemen tot ainde maand
            if (x == null) 
            {
                return BadRequest();
            }
            var y = x.Password.Equals(wachtwoord);
            if (y == true)
            {
                Console.WriteLine("succes");
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
