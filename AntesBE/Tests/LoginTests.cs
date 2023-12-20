using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using System.Threading.Tasks;
using Konscious.Security.Cryptography;
using AntesBE.Controllers;
using YourNamespace;
using System.Text.Json;
using System.Net.Http;


[TestClass]
public class LoginTests
{
    private static HttpClient httpClient = new()
    {
        BaseAddress = new Uri("https://jsonplaceholder.typicode.com"),
    };
    //helperfunction
    public async Task Seedaccount()
    {
        ForumContext db = new ForumContext();
        var testaccount = new Account();
        testaccount.Name = "testaccount";
        testaccount.Password = "";
        //db.Accounts.Add( );
        string password = "TestPassword123";
    }

    [TestMethod]
    public async Task TestLogin()
    {
        // Arrange
        await Seedaccount();

        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            userId = 77,
            id = 1,
            title = "write code sample",
            completed = false
        }),
        Encoding.UTF8,
        "application/json");
        
        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos",jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);
    }

    [TestMethod]
    public async Task TestReset()
    {
        // Arrange
        await Seedaccount();

        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            userId = 77,
            id = 1,
            title = "write code sample",
            completed = false
        }),
        Encoding.UTF8,
        "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);
    }

    [TestMethod]
    public async Task TestRegister()
    {
        // Arrange
        await Seedaccount();

        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            userId = 77,
            id = 1,
            title = "write code sample",
            completed = false
        }),
        Encoding.UTF8,
        "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);
    }

    [TestMethod]
    private async Task TestGetBio()
    {
        // Arrange
        await Seedaccount();

        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            userId = 77,
            id = 1,
            title = "write code sample",
            completed = false
        }),
        Encoding.UTF8,
        "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);
    }

    [TestMethod]
    private async Task TestpostBio()
    {
        // Arrange
        await Seedaccount();

        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            userId = 77,
            id = 1,
            title = "write code sample",
            completed = false
        }),
        Encoding.UTF8,
        "application/json");

        // Act
        using HttpResponseMessage response = await httpClient.PostAsync("todos", jsonContent);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);
    }
}
