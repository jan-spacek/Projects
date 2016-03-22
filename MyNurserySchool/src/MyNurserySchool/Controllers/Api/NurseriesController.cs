using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Models;
using System.Net;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;
using MyNurserySchool.Data;
using MyNurserySchool.ViewModels;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
    [Route("Api/Nurseries")]
    public class NurseriesController : Controller
    {
        private ILogger<NurseriesController> _logger;
        private INurseriesRepository _repository;

        public NurseriesController(INurseriesRepository repository, ILogger<NurseriesController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get()
        {
            if (User.IsInRole("Admin"))
            {
                var results = Mapper.Map<IEnumerable<NurseryViewModel>>(_repository.GetAllNurseries());
                return Json(results);
            }
            else
            {
                List<int> nursList = new List<int>();
                var matchingNurs = User.FindAll("Nursery").ToList();
                foreach (var nurs in matchingNurs)
                {
                    nursList.Add(int.Parse(nurs.Value));
                }
                var results = Mapper.Map<IEnumerable<NurseryViewModel>>(_repository.GetAllNurseries(nursList));
                return Json(results);
            }
        }
    }
}
