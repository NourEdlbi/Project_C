using Microsoft.AspNetCore.Mvc;
using YourNamespace;

namespace AntesBE.Controllers
{
    public class LoginController : Controller
    {
        [Route("Login")]
        [HttpPost]
        public IActionResult Login(string email, string wachtwoord) 
        {
            ForumContext db = new ForumContext();
            var x = db.Accounts.Where(x => x.Email.ToLower().Equals(email.ToLower())).FirstOrDefault(); 
            if (x != null)
            {
                if (x.Password == wachtwoord)
                {
                    return Ok(x);
                }                 
            }
            return BadRequest();
        }
       /* public IActionResult Index()
        {
            return View();
        }*/
    }
}
