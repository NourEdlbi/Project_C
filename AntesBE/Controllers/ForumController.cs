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
    public record ForumData(string postName, string Content);

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

                    Forum post = new Forum
                    {
                        "ID": 1,
                        "ForumPosterID": 2,
                        "Name":"test",
                        "Content": "test",
                        "PostTime": DateTime.Now

                    };

                db.Forums.Add(post);
                db.SaveChanges();
                return Ok(forumDatas);



            }
        }

            try
            {
                ForumContext db = new ForumContext();
        var post = new Forum() { ID = 1, ForumPosterID = 2, Name = forumData.postName, Content = forumData.Content };

        db.Forums.Add(post);
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