using Microsoft.AspNetCore.Mvc;
using Portafolio_Bookmark.Models;
using Portafolio_Bookmark.Models.Data;
using System.Diagnostics;

namespace Portafolio_Bookmark.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        } 
        public IActionResult MisLibros()
        {
            return View();
        } 
        public IActionResult Busqueda()
        {
            return View();
        }
        public IActionResult Principal()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult GuardarLibro(Libro libro)
        {


            return Ok();
        }
    }
}