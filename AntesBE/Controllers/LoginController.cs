using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using YourNamespace;

namespace AntesBE.Controllers
{
    public record Personregister(string name, string email, string wachtwoord);
    public record Person(string email, string wachtwoord);
    public record Email(string email);
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
                    var logindata = JsonSerializer.Deserialize<Person>(postData);
                    ForumContext db = new ForumContext();
                    var x = db.Accounts.Where(x => x.Email.ToLower().Equals(logindata.email.ToLower())).FirstOrDefault();
                    if (x != null)
                    {
                        if (x.Password == logindata.wachtwoord)
                        {
                            return Ok(x);
                        }
                    }
                    return BadRequest();
                }
            }
            return Ok();
        }

        [Route("Request_Password_Reset")]
        [HttpPost]
        public IActionResult ResetPassword(string email)
        {

            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    var logindata = JsonSerializer.Deserialize<Email>(postData);
                    ForumContext db = new ForumContext();
                    var x = db.Accounts.Where(x => x.Email.ToLower().Equals(logindata.email.ToLower())).FirstOrDefault();
                    if (x != null)
                    {
                        // send email with link to [Route("Reset_Password")]
                    }
                    return BadRequest();
                }
            }
            return Ok();
        }

        [Route("Register")]
        [HttpPost]
        public IActionResult Register(string email, string wachtwoord)
        {

            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    var newdata = JsonSerializer.Deserialize<Personregister>(postData);
                    
                    ForumContext db = new ForumContext();
                    Account newaccount = new Account();    
                    newaccount.Email = newdata.email;
                    newaccount.Password = newdata.wachtwoord;
                    newaccount.ID = db.Accounts.Count() + 1;
                    newaccount.Admin = false;
                    newaccount.Name = newdata.name;
                    db.Accounts.Add(newaccount);
                    db.SaveChanges();
                    return Ok();    
                }
            }
            return BadRequest();
        }
    }
}
