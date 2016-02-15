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
        
        [HttpGet("App/Nursery")]
        public IActionResult Nursery()
        {
            if (User.FindFirst("Nursery") != null)
            {
                int id = int.Parse(User.FindFirst("Nursery").Value);
                var nursery = Mapper.Map<NurseryViewModel>(_repository.GetNurseryById(id));
                return View(nursery);
            }
            else if (User.FindFirst("Full") != null)
            {
                return RedirectToAction("Nurseries", "App");
            }
            else
            {
                return RedirectToAction("Index", "Public");
            }
        }

        [HttpGet("App/Nursery/{id}")]
        public IActionResult Nursery(int id)
        {
            if (User.FindFirst("Full") != null || ( User.FindFirst("Nursery") != null && User.FindFirst("Nursery").Value == id.ToString()))
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
