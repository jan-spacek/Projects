using System.Linq;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.ViewModels;
using Microsoft.AspNet.Authorization;
using MyNurserySchool.Data;
using AutoMapper;

namespace MyNurserySchool.Controllers.Web
{
    [Authorize]
    public class AppController : Controller
    {
        private INurseriesRepository _repository;

        public AppController(INurseriesRepository repository)
        {
            _repository = repository;
        }

        public IActionResult Nurseries()
        {
            return View();
        }

        public IActionResult Nursery()
        {
            if (User.IsInRole("Admin") || User.FindAll("Nursery").ToList().Count > 1)
            {
                return RedirectToAction("Nurseries", "App");
            }
            else if (User.FindFirst("Nursery") != null)
            {
                int id = int.Parse(User.FindFirst("Nursery").Value);
                var nursery = Mapper.Map<NurseryViewModel>(_repository.GetNurseryById(id));
                return View(nursery);
            }
            else
            {
                return RedirectToAction("Index", "Public");
            }
        }

        [HttpGet("App/Nursery/{id}")]
        public IActionResult Nursery(int id)
        {
            var matchingNurs = User.FindAll("Nursery")
                    .FirstOrDefault(claim => claim.Value == id.ToString());

            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                var nursery = Mapper.Map<NurseryViewModel>(_repository.GetNurseryById(id));
                return View(nursery);
            }
            else
            {
                return RedirectToAction("Index", "Public");
            }
        }
    }
}
