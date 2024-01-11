using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using YourNamespace;

namespace AntesBE.Controllers
{
    public record QuizData(int id, int makerID, string name, string description, List<QuestionData> questions);
    public record QuestionData(int id, int quizID, string questionText, string answer1, string answer2, string answer3, string correctAnswer);
    public record AnswerData(int id, string answer);
    public record QuizResultData( int quizID, int quizSubmitterID, List<AnswerData> Answers);
    public record QuizID(int id);
    public record QuizIDstring(string id);

    public class QuizController : Controller
    {
        [Route("NewQuiz")]
        [HttpPost]
        public async Task<IActionResult> NewQuiz()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync(); 
                var quizData = JsonSerializer.Deserialize<QuizData>(postData);
                if (quizData != null)
                {
                    ForumContext db = new ForumContext();
                    Quiz quiz = new();
                    quiz.QuizCreatorID = 1;
                    quiz.ID = db.Quizzes.Count() + 1; // dit gaat ni werken met delete
                    quiz.Name = quizData.name;
                    quiz.Description = quizData.description;
                    db.Quizzes.Add(quiz);

                    List<Question> questions = new List<Question>();
                    foreach (var q in quizData.questions)
                    {
                        Console.WriteLine(q);
                        Question question = new();
                        //question.ID = db.Questions.Count() + 1;
                        question.QuizID = quiz.ID;
                        question.QuestionText = q.questionText;                        
                        question.Answer1 = q.answer1;
                        question.Answer2 = q.answer2;
                        question.Answer3 = q.answer3;
                        question.CorrectAnswer = q.correctAnswer;

                        questions.Add(question);
                    }
                    db.Questions.AddRange(questions.ToArray());
                    db.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest();
        }

        [Route("DisplayQuizzes")]
        [HttpGet]
        public IActionResult DisplayQuizzes()
        {
            try
            {
                ForumContext db = new ForumContext();
                var quizzesList = db.Quizzes.ToList();

                return Ok(quizzesList);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [Route("GetQuizQuestions")]
        [HttpPost]
        public async Task<IActionResult> GetQuestions()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var newdata = JsonSerializer.Deserialize<QuizIDstring>(postData);
                if (newdata != null)
                { 
                    ForumContext db = new ForumContext();
                    var quiz = db.Quizzes.FirstOrDefault(q => q.ID.ToString() == newdata.id) ;
                    var questions = db.Questions.Where(q => q.QuizID.ToString() == newdata.id).ToList();
                    questions.ForEach(q => { q.Quiz = null; });
                    
                    return Ok(quiz);
                }
            }
            return BadRequest();
        }

        [Route("SubmitQuiz")]
        [HttpPost]
        public async Task<IActionResult> SubmitQuiz()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var QuizData = JsonSerializer.Deserialize<QuizResultData>(postData);
                ForumContext db = new ForumContext();
                var quizresultid = db.QuizResults.Count() + 1;
                List<Answer> answers = new List<Answer>();
                if (QuizData != null)
                {
                    foreach (var item in QuizData.Answers)
                    {
                        Answer answer = new Answer();
                        answer.ID = db.Answers.Count() + 1; //idk
                        answer.Value = item.answer;
                        answer.QuizResultID = quizresultid;
                        answers.Add(answer);    
                    }
               
                    QuizResult quizRes = new QuizResult();
                    quizRes.QuizID = QuizData.quizID;
                    quizRes.QuizSubmitterID = QuizData.quizSubmitterID;
                    quizRes.AnswerID = quizresultid;

                    db.Answers.AddRange(answers);
                    db.QuizResults.Add(quizRes);
                    db.SaveChanges();

                    return Ok();
                }
            }
            return BadRequest();
        }

        [Route("DeleteQuiz")]
        [HttpDelete]
        public async Task<IActionResult> DeleteQuiz()
        {
            using (var reader = new StreamReader(HttpContext.Request.Body))
            {
                var postData = await reader.ReadToEndAsync();
                var quizid = JsonSerializer.Deserialize<QuizID>(postData);
                ForumContext db = new ForumContext();

                var Removequiz = db.Quizzes.Where(x => x.ID == quizid.id).FirstOrDefault();
                if (Removequiz != null)
                {
                    db.Quizzes.Remove(Removequiz);
                    db.SaveChanges();
                    return Ok();
                }
            }
            return BadRequest();
        }
    }
}