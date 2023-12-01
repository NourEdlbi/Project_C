/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */

using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using YourNamespace;

namespace AntesBE.Controllers
{
    public record ForumData(string forumName, string description);

    public class ForumController : Controller
    {
        [Route("ForumPost")]
        [HttpPost()]
        public IActionResult NewForum([FromBody] ForumData forumData)
        {
            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    var forumDatas = JsonSerializer.Deserialize<ForumData>(postData);
                    ForumContext db = new ForumContext();

                    Forum forum = new();
                    forum.ForumCreatorID = 1;
                    forum.ID = 2;
                    forum.Name = "test";
                    forum.Description = "test";
                    db.Forums.Add(forum);
                    db.SaveChanges();
                    return Ok(forumDatas);



                }
            }

            try
            {
                ForumContext db = new ForumContext();
                var forum = new Forum() { ID = 1, ForumCreatorID = 2, Name = formData.forumName, Description = forumData.description };

                db.forums.Add(forum);
                db.SaveChanges();

                return Ok(forumData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }


        }
    }
}