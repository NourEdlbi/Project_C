using Microsoft.AspNetCore.Mvc;

namespace AntesBE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Mycontrollerbase : ControllerBase
    {
        /*private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        *//*private readonly ILogger<Mycontrollerbase> _logger;

        public Mycontrollerbase(ILogger<Mycontrollerbase> logger)
        {
            _logger = logger;
        }*//*

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }*/
    }
}
