using Microsoft.AspNetCore.Mvc;

namespace AntesBE.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
