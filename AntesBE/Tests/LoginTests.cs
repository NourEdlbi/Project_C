using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text;
using YourNamespace;
using System.Text.Json;

[TestClass]
public class LoginTests
{
    private static HttpClient httpClient = new()
    {
        BaseAddress = new Uri("https://localhost:7109"),
    };
    //helperfunctions
    public async Task Seedaccount()
    {
        ForumContext db = new ForumContext();
        var testaccount = new Account();
        var acountexists = db.Accounts.Where(x => x.Email == "test@hotmail.com" && x.Name == "testaccount").First();
        if (acountexists == null)
        {
            testaccount.Email = "test@hotmail.com";
            testaccount.Name = "testaccount";
            testaccount.Password = "TestPassword123";
            db.Accounts.Add(testaccount);
            await db.SaveChangesAsync();
        }
    }

    public StringContent jsoncontent(string consolemsg, string Email, string Wachtwoord)
    {
        Console.WriteLine(consolemsg + "\n");
        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            email = Email,
            wachtwoord = Wachtwoord
        }),
        Encoding.UTF8,
        "application/json");

        return jsonContent;
    }
    public StringContent jsoncontent(string consolemsg, string Email, string Name, string Wachtwoord)
    {
        Console.WriteLine(consolemsg + "\n");
        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            name = Name,
            email = Email,
            wachtwoord = Wachtwoord
        }),
        Encoding.UTF8,
        "application/json");

        return jsonContent;
    }
    public StringContent jsonbiocontent(string consolemsg, string Email, string Bio)
    {
        Console.WriteLine(consolemsg + "\n");
        using StringContent jsonContent = new(
        JsonSerializer.Serialize(new
        {
            email = Email,
            bio = Bio
        }),
        Encoding.UTF8,
        "application/json");

        return jsonContent;
    }

    [TestMethod]
    public async Task TestLogin()
    {
        // Arrange
        await Seedaccount();
        StringContent[] stringContents = new StringContent[0];
        stringContents.Append(jsoncontent(consolemsg: "Test 1: Correcte Informatie", Email: "test@hotmail.com", Wachtwoord: "TestPassword123"));
        stringContents.Append(jsoncontent(consolemsg: "Test 2: email is null", Email: null, Wachtwoord: "TestPassword123"));
        stringContents.Append(jsoncontent(consolemsg: "Test 3: wachtwoord is null", Email: "test@hotmail.com", Wachtwoord: null));
        stringContents.Append(jsoncontent(consolemsg: "Test 4: Verkeerd wachtwoord", Email: "test@hotmail.com", Wachtwoord: "TestPassword"));
        stringContents.Append(jsoncontent(consolemsg: "Test 5: verkeerde email", Email: "te", Wachtwoord: "TestPassword123"));

        
        foreach (var jsonContent in stringContents)
        {
            // Act
            using HttpResponseMessage response = await httpClient.PostAsync($"{httpClient.BaseAddress}/Login",jsonContent);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

            // Assert
            Assert.IsNotNull(jsonResponse);
        }
    }

    [TestMethod]
    public async Task TestReset()
    {
        // Arrange
        await Seedaccount();
        var jsonreset = jsoncontent(consolemsg: "Test 1: Verander wachtwoord", Email: "test@hotmail.com", Wachtwoord: "TestPassword");
        
        // Act
        using HttpResponseMessage response = await httpClient.PostAsync($"{httpClient.BaseAddress}/Password_Reset", jsonreset);
        var jsonResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

        // Assert
        Assert.IsNotNull(jsonResponse);


        StringContent[] stringContents = new StringContent[0];
        stringContents.Append(jsoncontent(consolemsg: "Test 2: Inloggen correct wachtwoord", Email: "test@hotmail.com", Wachtwoord: "TestPassword"));
        stringContents.Append(jsoncontent(consolemsg: "Test 3: Inloggen oud wachtwoord", Email: "test@hotmail.com", Wachtwoord: "TestPassword123"));
        stringContents.Append(jsoncontent(consolemsg: "Test 4: Inloggen verkeerd wachtwoord", Email: "test@hotmail.com", Wachtwoord: "Test"));


        foreach (var jsonContent in stringContents)
        {
            // Act
            using HttpResponseMessage loginresponse = await httpClient.PostAsync($"{httpClient.BaseAddress}/Login", jsonContent);
            var jsonResponse2 = await loginresponse.Content.ReadAsStringAsync();
            Console.WriteLine($"{loginresponse.IsSuccessStatusCode} {jsonResponse2}\n");

            // Assert
            Assert.IsNotNull(jsonResponse2);
        }
    }

    [TestMethod]
    public async Task TestRegister()
    {
        // Arrange
        await Seedaccount();
        StringContent[] stringContents = new StringContent[0];
        stringContents.Append(jsoncontent(consolemsg: "Test 1: Correcte nieuwe unieke Informatie", Name: "newname", Email: "new@hotmail.com", Wachtwoord: "newPassword123"));
        stringContents.Append(jsoncontent(consolemsg: "Test 2: Email bestaat al", Name: "newname", Email: "test@hotmail.com", Wachtwoord: "newPassword123"));

        foreach (var jsonContent in stringContents)
        {
            // Act
            using HttpResponseMessage response = await httpClient.PostAsync($"{httpClient.BaseAddress}/Register", jsonContent);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{response.IsSuccessStatusCode} {jsonResponse}\n");

            // Assert
            Assert.IsNotNull(jsonResponse);
        }
    }
}
