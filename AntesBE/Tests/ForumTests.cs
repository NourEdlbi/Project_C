using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using System.Threading.Tasks;
using Konscious.Security.Cryptography;
using AntesBE.Controllers;
using YourNamespace;
using System.Text.Json;
using System.Net.Http;
using System.Net;


[TestClass]
public class Forumtests
{
    private static HttpClient httpClient = new HttpClient()
    {
        BaseAddress = new Uri("https://jsonplaceholder.typicode.com")
    };

    //helperfunction
    public async Task SeedAccount()
    {
        ForumContext db = new ForumContext();
        var testaccount = new Account();
        testaccount.Name = "testaccount";
        testaccount.Password = "";
        //db.Accounts.Add( );
        string password = "TestPassword123";
    }

    [TestMethod]
    public async Task TestForumPost()
    {
        // Arrange
        await SeedAccount();

        using StringContent jsonContent = new StringContent(
            JsonSerializer.Serialize(new
            {
                PostName = "Test Post",
                Content = "Test Content",
                UserID = 77
            }),
            Encoding.UTF8,
            "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        var deserializedResponse = JsonSerializer.Deserialize<Forum>(jsonResponse);
        Assert.IsTrue(response.IsSuccessStatusCode);
        Assert.IsNotNull(jsonResponse);
        Assert.IsNotNull(deserializedResponse);
        Assert.AreEqual("Test Content", deserializedResponse.Content);
    }

    [TestMethod]
    public async Task TestDeleteOwnPost()
    {
        // Arrange
        await SeedAccount();
        var userId = 77; 

        // Create a test post
        using StringContent createPostJsonContent = new StringContent(
            JsonSerializer.Serialize(new
            {
                PostName = "Test Post",
                Content = "Test Content",
                UserID = userId
            }),
            Encoding.UTF8,
            "application/json");

        using HttpResponseMessage createPostResponse = await httpClient.PostAsync("todos", createPostJsonContent);
        var createdPost = JsonSerializer.Deserialize<Forum>(await createPostResponse.Content.ReadAsStringAsync());
        var postId = createdPost.ID;

        // Act - 
        using HttpResponseMessage deletePostResponse = await httpClient.DeleteAsync($"DeleteForumPost/{postId}");

        // Assert
        var responseBody = await deletePostResponse.Content.ReadAsStringAsync();
        var expectedResponseBody = "{}";
        Assert.AreEqual(expectedResponseBody, responseBody, "Response body should be an empty JSON object.");

        using HttpResponseMessage getPostResponse = await httpClient.GetAsync($"todps/{postId}");
        Assert.AreEqual(HttpStatusCode.NotFound, getPostResponse.StatusCode, "The post should be deleted.");
    }

    [TestMethod]
    public async Task TestCreateComment()
    {
        // Arrange
        await SeedAccount();

        using StringContent jsonContent = new StringContent(
            JsonSerializer.Serialize(new
            {
                ForumID = 1,
                CommenterID = 77,
                Content = "Test Comment"
            }),
            Encoding.UTF8,
            "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        var deserializedResponse = JsonSerializer.Deserialize<Comment>(jsonResponse);
        Assert.IsTrue(response.IsSuccessStatusCode);
        Assert.IsNotNull(jsonResponse);
        Assert.IsNotNull(deserializedResponse);
        Assert.AreEqual("Test Comment", deserializedResponse.Content);
    }



}
