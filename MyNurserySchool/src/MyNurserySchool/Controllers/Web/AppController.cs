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

        public IActionResult Index()
        {
            return View();
        }
    }
}
