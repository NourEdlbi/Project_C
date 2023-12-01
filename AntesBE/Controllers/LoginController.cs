using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using YourNamespace;

namespace AntesBE.Controllers
{
    public record Personregister(string name, string email, string wachtwoord);
    public record Person(string email, string wachtwoord);
    public record Email(string email);
    public record Bio(string email, string bio);
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
                }
            }
            return BadRequest();
        }

        [Route("Password_Reset")]
        [HttpPost]
        public IActionResult ResetPassword()
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
                        x.Password = logindata.wachtwoord;
                        db.SaveChanges();
                        return Ok(); 
                    }
                }
            }  
            return BadRequest();
        }

        [Route("Register")]
        [HttpPost]
        public IActionResult Register()
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

        [Route("GetBio")]
        [HttpGet]
        public IActionResult GetBio() {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = reader.ReadToEnd();
                var newdata = JsonSerializer.Deserialize<Email>(postData);

                ForumContext db = new ForumContext();
                var account = db.Accounts.Where(x => x.Email.ToLower().Equals(newdata.email)).FirstOrDefault();
                if (account != null)
                {
                    return Ok(account.Profile);
                }
            }
            return BadRequest();
        }

        [Route("PostBio")]
        [HttpPost]
        public async Task<IActionResult> PostBio()
        {
            char[] result;
            using (var reader = new StreamReader(
                HttpContext.Request.Body,
                bufferSize: 1024))            
            {
                HttpContext.Request.EnableBuffering();
                reader.BaseStream.Seek(0, SeekOrigin.Begin);
                var data = await reader.ReadToEndAsync();

                var newdata = JsonSerializer.Deserialize<Bio>(data);

                ForumContext db = new ForumContext();
                var account = db.Accounts.Where(x => x.Email.ToLower().Equals(newdata.email)).FirstOrDefault();
                var profile = db.Profiles.Where(x => account.ID.Equals(x.AccountID)).FirstOrDefault();
                if (profile != null)
                {
                    profile.Bio = newdata.bio;
                    db.SaveChanges();
                    return Ok(account.Profile);
                }
            }
            return BadRequest();
        }

    }
}
