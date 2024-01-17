using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using YourNamespace;
using System.Text.Json;
using AntesBE.Controllers;

namespace AntesBE.Tests
{
    [TestClass]
    public class QuizTests
    {
        private static HttpClient httpClient = new()
        {
            BaseAddress = new Uri("https://localhost:7109"),
        };
        public async Task SeedQuiz()
        {
            ForumContext db = new ForumContext();
            var testquiz = new Quiz();
            var quizexists = db.Quizzes.Where(x => x.Name == "testquiz" ).First();
            if (quizexists == null)
            {
                testquiz.QuizCreatorID = 666;
                testquiz.Name = "testquiz";
                List<Question> qs = new List<Question>();
                Question q1 = new Question();
                q1.Answer1 = "b";
                q1.Answer2 = "c";
                q1.Answer3 = "d";
                q1.QuestionText = "A IS CORRECT";
                q1.CorrectAnswer = "a";
                Question q2 = new Question();
                q2.Answer1 = "a";
                q2.Answer2 = "c";
                q2.Answer3 = "d";
                q2.QuestionText = "B IS CORRECT";
                q2.CorrectAnswer = "b";
                qs.Add(q1);
                qs.Add(q2);
                testquiz.Questions = qs;
                db.Quizzes.Add(testquiz);
                await db.SaveChangesAsync();
            }
        }

        public StringContent jsoncontent(string consolemsg, int Id, int MakerID, string Name, string Description, List<Question> Questions)
        {
            Console.WriteLine(consolemsg + "\n");
            using StringContent jsonContent = new(
            JsonSerializer.Serialize(new
            {
                id = Id,
                makerID = MakerID,
                name = Name,
                description = Description,
            }),
            Encoding.UTF8,
            "application/json");

            return jsonContent;
        }


        [TestMethod] 
        public async Task TestNewQuiz()
        {
            // Arrange
            await SeedQuiz();
            StringContent[] stringContents = new StringContent[0];
            List<Question> qs = new List<Question>();
            Question q1 = new Question();
            q1.Answer1 = "b";
            q1.Answer2 = "c";
            q1.Answer3 = "d";
            q1.QuestionText = "A IS CORRECT";
            q1.CorrectAnswer = "a";
            Question q2 = new Question();
            q2.Answer1 = "a";
            q2.Answer2 = "c";
            q2.Answer3 = "d";
            q2.QuestionText = "B IS CORRECT";
            q2.CorrectAnswer = "b";
            qs.Add(q1);
            qs.Add(q2);

            stringContents.Append(jsoncontent(consolemsg: "Test 1: Correcte Informatie",Name:"", Id:0, MakerID:0, Description:"",Questions:qs ));
            stringContents.Append(jsoncontent(consolemsg: "Test 2: email is null", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 3: wachtwoord is null", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 4: Verkeerd wachtwoord", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 5: verkeerde email", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));


            foreach (var jsonContent in stringContents)
            {
                // Act
                using HttpResponseMessage response = await httpClient.PostAsync($"{httpClient.BaseAddress}/NewQuiz", jsonContent);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

                // Assert
                Assert.IsNotNull(jsonResponse);
            }
        }

        [TestMethod]
        public async Task TestSubmitQuiz()
        {
            // Arrange
            await SeedQuiz();
            StringContent[] stringContents = new StringContent[0];
            List<Question> qs = new List<Question>();
            Question q1 = new Question();
            q1.Answer1 = "b";
            q1.Answer2 = "c";
            q1.Answer3 = "d";
            q1.QuestionText = "A IS CORRECT";
            q1.CorrectAnswer = "a";
            Question q2 = new Question();
            q2.Answer1 = "a";
            q2.Answer2 = "c";
            q2.Answer3 = "d";
            q2.QuestionText = "B IS CORRECT";
            q2.CorrectAnswer = "b";
            qs.Add(q1);
            qs.Add(q2);

            stringContents.Append(jsoncontent(consolemsg: "Test 1: Correcte Informatie", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 2: email is null", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 3: wachtwoord is null", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 4: Verkeerd wachtwoord", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));
            stringContents.Append(jsoncontent(consolemsg: "Test 5: verkeerde email", Name: "", Id: 0, MakerID: 0, Description: "", Questions: qs));


            foreach (var jsonContent in stringContents)
            {
                // Act
                using HttpResponseMessage response = await httpClient.PostAsync($"{httpClient.BaseAddress}/Login", jsonContent);
                var jsonResponse = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

                // Assert
                Assert.IsNotNull(jsonResponse);
            }
        }
    }
}
