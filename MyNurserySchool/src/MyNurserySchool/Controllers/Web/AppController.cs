using System.Linq;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.ViewModels;
using Microsoft.AspNet.Authorization;
using MyNurserySchool.Data;
using AutoMapper;
using MyNurserySchool.Models;

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

        public IActionResult Index()
        {
            if (User.IsInRole("Admin") || User.FindAll("Nursery").ToList().Count > 1)
            {
                return View(null);
            }
            else if (User.FindFirst("Nursery") != null)
            {
                int id = int.Parse(User.FindFirst("Nursery").Value);
                var nursery = _repository.GetNurseryById(id);
                var nurseryBasic = Mapper.Map<NurseryBasicViewModel>(nursery);
                return View(nurseryBasic);
            }
            else
            {
                return RedirectToAction("Error", "Public");
            }
        }

        [Route("App/{id}")]
        public IActionResult Index(int id)
        {
            var nursery = _repository.GetNurseryById(id);
            var nurseryBasic = Mapper.Map<NurseryBasicViewModel>(nursery);
            return View(nurseryBasic);
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
