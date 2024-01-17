using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using YourNamespace;

[TestClass]
public class AgendaTests
{
    private static readonly HttpClient HttpClient = new HttpClient()
    {
        BaseAddress = new Uri("https://jsonplaceholder.typicode.com") // Replace with your API base URL
    };

    [TestMethod]
    public async Task TestGetAgendaItemsForSpecificMonth()
    {
        // Arrange
        var targetMonth = 1; // Replace with the desired month for testing

        // Act
        using HttpResponseMessage response = await HttpClient.GetAsync($"Getagenda/{targetMonth}");

        // Assert
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var jsonResponse = await response.Content.ReadAsStringAsync();
        var agendaItems = JsonSerializer.Deserialize<dynamic[]>(jsonResponse);

        // Add specific assertions based on your API response and expected data
        Assert.IsNotNull(agendaItems);
        Assert.IsTrue(agendaItems.Length > 0);
        // Add more assertions as needed
    }

    [TestMethod]
    public async Task TestAddAgendaItem()
    {
        // Arrange
        var agendaItem = new
        {
            id = 1,
            title = "Test Title",
            description = "Test Description",
            date = DateTime.Now.ToString("yyyy-MM-dd"),
            begintime = "12:00:00",
            endtime = "13:00:00"
        };

        using StringContent jsonContent = new StringContent(
            JsonSerializer.Serialize(agendaItem),
            Encoding.UTF8,
            "application/json");

        // Act
        using HttpResponseMessage response = await HttpClient.PostAsync("AddAgendaItem", jsonContent);

        // Assert
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var responseBody = await response.Content.ReadAsStringAsync();
        Assert.AreEqual("Agenda item added successfully.", responseBody);

        // Additional assertions can be added based on the expected behavior of your API
    }

    // Add more tests for other agenda-related functionality as needed

    // Cleanup logic can be added if necessary
}
