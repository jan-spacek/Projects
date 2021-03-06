﻿using AutoMapper;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Data;
using MyNurserySchool.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
    [Route("api/nurseries")]
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
