using Microsoft.AspNet.Mvc;

namespace MyNurserySchool.Controllers.Web
{
    public class PublicController : Controller
    {
        public PublicController()
        {
        }
        
        public IActionResult Index()
        {
            if (User.Identity.IsAuthenticated)
                return RedirectToAction("Index", "App");
            else
                return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
    }
}
