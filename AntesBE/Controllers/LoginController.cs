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
    public class LoginController : Controller
    {
        // Records for data models
        public record Personregister(string name, string email, string wachtwoord);
        public record Person(string email, string wachtwoord);
        public record Email(string email);
        public record Bio(string email, string bio);

        // Action to handle login
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var logindata = JsonSerializer.Deserialize<Person>(postData);
                ForumContext db = new ForumContext();

                var account = db.Accounts.FirstOrDefault(x => x.Email.Trim().ToLower() == logindata.email.Trim().ToLower());

                if (account != null && await VerifyPassword(logindata.wachtwoord, account.Password))
                {
                    // Passwords match
                    return Ok(account);
                }
            }
            return BadRequest();
        }

        // Action to handle password reset
        [Route("Password_Reset")]
        [HttpPost]
        public async Task<IActionResult> ResetPassword()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var logindata = JsonSerializer.Deserialize<Person>(postData);
                ForumContext db = new ForumContext();
                var x = db.Accounts.Where(x => x.Email.ToLower().Equals(logindata.email.ToLower())).FirstOrDefault();
                if (x != null)
                {
                    x.Password = logindata.wachtwoord;
                    await db.SaveChangesAsync();
                    return Ok();
                }
            }
            return BadRequest();
        }

        // Action to handle user registration
        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var newdata = JsonSerializer.Deserialize<Personregister>(postData);

                ForumContext db = new ForumContext();
                Account newaccount = new Account();
                newaccount.Email = newdata.email;

                // Hash the password using Argon2 during registration
                string hashedPassword = await HashPassword(newdata.wachtwoord);
                newaccount.Password = hashedPassword;

                newaccount.ID = db.Accounts.Count() + 1;
                newaccount.Admin = false;
                newaccount.Name = newdata.name;
                db.Accounts.Add(newaccount);
                await db.SaveChangesAsync();
                return Ok();
            }
        }

        // Helper method to hash a password using Argon2
        private async Task<string> HashPassword(string password)
        {
            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.DegreeOfParallelism = 8; // Adjust according to your server capabilities
                hasher.MemorySize = 65536; // 64 MB
                hasher.Iterations = 4;

                return Convert.ToBase64String(await hasher.GetBytesAsync(32)); // 32-byte hash
            }
        }

        // Helper method to verify a password using Argon2
        private async Task<bool> VerifyPassword(string password, string hashedPassword)
        {
            byte[] hashToVerify = Convert.FromBase64String(hashedPassword);

            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.DegreeOfParallelism = 8;
                hasher.MemorySize = 65536;
                hasher.Iterations = 4;

                byte[] computedHash = await hasher.GetBytesAsync(32);

                return hashToVerify.SequenceEqual(computedHash);
            }
        }

        // Action to get user bio
        [Route("GetBio")]
        [HttpPost]
        public async Task<IActionResult> GetBio()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var newdata = JsonSerializer.Deserialize<Email>(postData);

                ForumContext db = new ForumContext();
                var account = db.Accounts.Where(x => x.Email.ToLower().Equals(newdata.email)).FirstOrDefault();
                if (account != null)
                {
                    var profile = db.Profiles.Where(x => x.AccountID.Equals(account.ID)).FirstOrDefault();
                    if (profile.Bio != null)
                    {
                        Console.WriteLine(profile.Bio);
                        return Ok(profile.Bio);
                    }
                    else
                    {
                        Console.WriteLine("je hbet geen bio \n");
                        return Ok("je hebt nog geen bio");
                    }
                }
            }
            return BadRequest();
        }

        [Route("DeleteUser")]
        [HttpPost]
        public async Task<IActionResult> DeleteUser()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var emailData = JsonSerializer.Deserialize<Email>(postData);

                ForumContext db = new ForumContext();
                var account = db.Accounts.FirstOrDefault(x => x.Email.ToLower().Equals(emailData.email.ToLower()));

                if (account != null)
                {
                    db.Accounts.Remove(account); // Mark the user for deletion
                    await db.SaveChangesAsync(); // Commit the changes

                    // Explicitly set the content type in the response headers
                    HttpContext.Response.Headers.Add("Content-Type", "application/json");
                    return Ok(new { message = "User deleted successfully." });
                }
            }

            // Modify this part to return a BadRequest with a JSON object
            // Also, explicitly set the content type in the response headers
            HttpContext.Response.Headers.Add("Content-Type", "application/json");
            return BadRequest(new { error = "User not found." });
        }


        // Action to post user bio
        [Route("PostBio")]
        [HttpPost]
        public async Task<IActionResult> PostBio()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var data = await reader.ReadToEndAsync();
                var newdata = JsonSerializer.Deserialize<Bio>(data);

                ForumContext db = new ForumContext();
                var account = db.Accounts.Where(x => x.Email.ToLower().Equals(newdata.email)).FirstOrDefault();
                if (account != null)
                {
                    var profile = db.Profiles.Where(x => account.ID.Equals(x.AccountID)).FirstOrDefault();
                    if (profile == null) // create a profile if one doesnt exist
                    {
                        Profile profile1 = new Profile();
                        profile1.AccountID = account.ID;
                        profile1.ID = account.ID;
                        profile1.Bio = newdata.bio;
                        profile1.Contact = account.Email;
                        db.Profiles.Add(profile1);  
                        await db.SaveChangesAsync();
                        return Ok(profile1.Bio);
                    }
                    else
                    {
                        profile.Bio = newdata.bio;
                        await db.SaveChangesAsync();
                        return Ok(profile.Bio);
                    }
                }
            }
            return BadRequest();
        }
    }
}
