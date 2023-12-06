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
    public record QuizData(int id, int makerID, string name, string description, List<QuestionData> questions);
    public record QuestionData(int id, int quizID, string text, string answer1, string answer2, string answer3, string correctAnswer);

    public class QuizController : Controller
    {
        [Route("adminSidebar/Quizzes/MakeQuiz")]
        [HttpPost]
        public IActionResult NewQuiz()
        {
            var syncIOFeature = HttpContext.Features.Get<IHttpBodyControlFeature>();
            if (syncIOFeature != null)
            {
                syncIOFeature.AllowSynchronousIO = true;
                using (var reader = new StreamReader(HttpContext.Request.Body))
                {
                    var postData = reader.ReadToEnd();
                    var quizData = JsonSerializer.Deserialize<QuizData>(postData);
                    ForumContext db = new ForumContext();

                    Quiz quiz = new();
                    quiz.QuizCreatorID = 1;
                    quiz.ID = db.Quizzes.Count() + 1;
                    quiz.Name = quizData.name;
                    quiz.Description = quizData.description;
                    db.Quizzes.Add(quiz);
                    db.SaveChanges();

                    foreach (var q in quizData.questions)
                    {
                        Question question = new();
                        question.ID = db.Questions.Count() + 1;
                        question.QuizID = quiz.ID;
                        question.QuestionText = q.text;
                        question.Answer1 = q.answer1;
                        question.Answer2 = q.answer2;
                        question.Answer3 = q.answer3;
                        question.CorrectAnswer = q.correctAnswer;
                        db.Questions.Add(question);
                        db.SaveChanges();
                    }


                    return Ok();
                }
            }
            return BadRequest();
        }

        [Route("adminSidebar/adminQuiz")]
        [Route("userSidebar/Quizzes")]
        [HttpGet]
        public IActionResult DisplayQuizzes()
        {
            try
            {
                ForumContext db = new ForumContext();
                var quizzesList = db.Quizzes.ToList();

                return Ok(quizzesList);
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        [Route("userSidebar/Quizzes/{quizId}")]
        [HttpGet]
        public IActionResult GetQuestions(int quizId)
        {
            try
            {
                ForumContext db = new ForumContext();
                var questions = db.Questions.Where(q => q.QuizID == quizId).ToList();
                return Ok(questions);
            }
            catch (System.Exception)
            {
                return BadRequest();
            }

        }
    }
}