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
    public record QuizData(string quizName, string description);

    public class QuizController : Controller
    {
        [Route("MakeQuiz")]
        [HttpPost()]
        public IActionResult NewQuiz([FromBody] QuizData quizData)
        {
            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    var quizDatas = JsonSerializer.Deserialize<QuizData>(postData);
                    ForumContext db = new ForumContext();

                    Quiz quiz = new();
                    quiz.QuizCreatorID = 1;
                    quiz.ID = 2;
                    quiz.Name = "test";
                    quiz.Description = "test";
                    db.Quizzes.Add(quiz);
                    db.SaveChanges();
                    return Ok(quizDatas);



                }
            }

            try
            {
                ForumContext db = new ForumContext();
                var quiz = new Quiz() { ID = 1, QuizCreatorID = 2, Name = quizData.quizName, Description = quizData.description };

                db.Quizzes.Add(quiz);
                db.SaveChanges();

                return Ok(quizData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }


        }
    }
}