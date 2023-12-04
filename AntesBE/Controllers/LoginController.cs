﻿using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Text.Json;
using YourNamespace; // Replace with your actual namespace
using Konscious.Security.Cryptography;
using System.Text;

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
        public IActionResult Login(string email, string wachtwoord)
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = reader.ReadToEnd();
                var logindata = JsonSerializer.Deserialize<Person>(postData);
                ForumContext db = new ForumContext();

                var account = db.Accounts.FirstOrDefault(x => x.Email.Trim().ToLower() == logindata.email.Trim().ToLower());

                if (account != null && VerifyPassword(logindata.wachtwoord, account.Password))
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
        public IActionResult ResetPassword()
        {
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

            return BadRequest();
        }

        // Action to handle user registration
        [Route("Register")]
        [HttpPost]
        public IActionResult Register()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = reader.ReadToEnd();
                var newdata = JsonSerializer.Deserialize<Personregister>(postData);

                ForumContext db = new ForumContext();
                Account newaccount = new Account();
                newaccount.Email = newdata.email;

                // Hash the password using Argon2 during registration
                string hashedPassword = HashPassword(newdata.wachtwoord);
                newaccount.Password = hashedPassword;

                newaccount.ID = db.Accounts.Count() + 1;
                newaccount.Admin = false;
                newaccount.Name = newdata.name;
                db.Accounts.Add(newaccount);
                db.SaveChanges();
                return Ok();
            }
        }

        // Helper method to hash a password using Argon2
        private string HashPassword(string password)
        {
            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                hasher.DegreeOfParallelism = 8; // Adjust according to your server capabilities
                hasher.MemorySize = 65536; // 64 MB
                hasher.Iterations = 4;

                return Convert.ToBase64String(hasher.GetBytes(32)); // 32-byte hash
            }
        }

        // Helper method to verify a password using Argon2
        private bool VerifyPassword(string password, string hashedPassword)
        {
            byte[] hashToVerify = Convert.FromBase64String(hashedPassword);
            
            using (var hasher = new Argon2id(Encoding.UTF8.GetBytes(password)))
            {
                byte[] computedHash = hasher.GetBytes(32); // 32-byte hash

                if (hashToVerify.Length != computedHash.Length)
                {
                    return false;
                }

                bool result = true;
                for (int i = 0; i < hashToVerify.Length; i++)
                {
                    result &= (hashToVerify[i] == computedHash[i]);
                }

                return result;
            }
        }

        // Action to get user bio
        [Route("GetBio")]
        [HttpGet]
        public IActionResult GetBio()
        {
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

        // Action to post user bio
        [Route("PostBio")]
        [HttpPost]
        public async Task<IActionResult> PostBio()
        {
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
