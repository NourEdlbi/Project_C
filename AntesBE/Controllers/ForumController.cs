
using Microsoft.AspNetCore.Mvc;
using YourNamespace;

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
                    return Ok(post); // Return the saved post, including the ID
                }
            }
            catch (Exception ex)
            {
                // Log or return the detailed exception
                // Adjust based on how you handle logging in your application
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
