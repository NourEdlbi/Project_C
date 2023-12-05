using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using YourNamespace;

namespace AntesBE.Controllers
{
    public record Personregister(string name, string email, string wachtwoord);
    public record Person(string email, string password);
    public class LoginController : Controller
    {
        /*private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }*/

        /*[Route("Auth")]
        [HttpPost]
        public IActionResult Auth() 
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
                        if (x.Password == logindata.password)
                        {
                            // create jason web token
                            var tokenHandler = new JwtSecurityTokenHandler();
                            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                            var tokenDescriptor = new SecurityTokenDescriptor
                            {
                                Subject = new ClaimsIdentity(new Claim[]
                                {
                                    new Claim(ClaimTypes.Name, x.Email)
                                }),
                                Expires = DateTime.UtcNow.AddMinutes(30),
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                            };
                            var token = tokenHandler.CreateToken(tokenDescriptor);
                            string userToken = tokenHandler.WriteToken(token);                           
                            // return jsonwebtoken jwt
                            return Ok(userToken);                          
                        }
                    }
                }
            }
            return BadRequest();
        }*/

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
                        if (x.Password == logindata.password)
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
                        x.Password = logindata.password;
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
    }
}
