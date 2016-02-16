using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Services;
using MyNurserySchool.Models;
using Microsoft.AspNet.Authorization;
using MyNurserySchool.Data;
using AutoMapper;
using Microsoft.AspNet.Identity;
using MyNurserySchool.Authentication;
using System.Security.Claims;

namespace MyNurserySchool.Controllers.Web
{
    [Authorize]
    public class AppController : Controller
    {
        private IMailService _mailService;
        private INurseriesRepository _repository;

        public AppController(IMailService service, INurseriesRepository repository)
        {
            _mailService = service;
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

        public IActionResult Users()
        {
            return View();
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
