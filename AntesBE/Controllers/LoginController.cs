using Microsoft.AspNetCore.Http.Features;
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
            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    // {"email":"tes@te.nl","wachtwoord":"password"}

                    Console.WriteLine(postData);
                }
            }
            
            return Ok();
            /*ForumContext db = new ForumContext();
            var x = db.Accounts.Where(x => x.Email.ToLower().Equals(email.ToLower())).FirstOrDefault(); 
            if (x != null)
            {
                if (x.Password == wachtwoord)
                {
                    return Ok(x);
                }                 
            }
            return BadRequest();*/
        }
        /* public IActionResult Index()
         {
             return View();
         }*/
    }
}
