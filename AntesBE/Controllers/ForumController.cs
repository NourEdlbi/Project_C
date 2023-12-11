
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

        [Route("CreateComment")]
        [HttpPost]
        public IActionResult CreateComment([FromBody] Comment commentData)
        {
            try
            {
                using (var db = new ForumContext())
                {
                    commentData.PostTime = DateTime.UtcNow;

                    db.Comments.Add(commentData);
                    db.SaveChanges();


                    var commenterName = db.Accounts
                                          .Where(a => a.ID == commentData.CommenterID)
                                          .Select(a => a.Name)
                                          .FirstOrDefault();


                    var response = new
                    {
                        ID = commentData.ID,
                        ForumID = commentData.ForumID,
                        CommenterID = commentData.CommenterID,
                        Content = commentData.Content,
                        PostTime = commentData.PostTime,
                        CommenterName = commenterName
                    };

                    return Ok(response);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        [Route("GetComments/{forumId}")]
        [HttpGet]
        public IActionResult GetComments(int forumId)
        {
            try
            {
                using (var db = new ForumContext())
                {
                    var commentsWithNames = db.Comments
                        .Where(c => c.ForumID == forumId)
                        .Select(c => new
                        {
                            ID = c.ID,
                            ForumID = c.ForumID,
                            CommenterID = c.CommenterID,
                            Content = c.Content,
                            PostTime = c.PostTime,
                            CommenterName = c.Commenter.Name
                        })
                        .ToList();

                    return Ok(commentsWithNames);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex}");
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
