
using Microsoft.AspNetCore.Mvc;
using YourNamespace;
using Microsoft.EntityFrameworkCore;

namespace AntesBE.Controllers
{
    public record ForumData(string PostName, string Content);

    public class ForumController : Controller
    {
        [Route("ForumPost")]
        [HttpPost]
        public IActionResult NewForum([FromBody] ForumData forumData)
        {
            try
            {
                using (var db = new ForumContext())
                {
                    var post = new Forum()
                    {
                        ID = db.Forums.Count() + 1,
                        Name = forumData.PostName,
                        Content = forumData.Content,
                        PostTime = DateTime.Now.ToUniversalTime(),
                        ForumPosterID = 2
                    };

                    db.Forums.Add(post);
                    db.SaveChanges();
                    return Ok(post);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [Route("GetForumPosts")]
        [HttpGet]
        public IActionResult GetForumPosts()
        {
            try
            {
                using (var db = new ForumContext())
                {
                    var posts = db.Forums.ToList();
                    return Ok(posts);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [Route("GetForumDetail/{id}")]
        [HttpGet]
        public IActionResult GetForumDetail(int id)
        {
            try
            {
                using (var db = new ForumContext())
                {
                    var post = db.Forums
                        .Include(p => p.ForumPoster)
                        .FirstOrDefault(p => p.ID == id);

                    if (post == null)
                    {
                        return NotFound();
                    }

                    var forumDetail = new
                    {
                        postName = post.Name,
                        content = post.Content,
                        postTime = post.PostTime,
                        forumPosterName = post.ForumPoster.Name
                    };

                    return Ok(forumDetail);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }




    }
}
