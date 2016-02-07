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
            var results = Mapper.Map<IEnumerable<NurseryViewModel>>(_repository.GetAllNurseries(User.Identity.Name));

            return Json(results);
        }
    }
}
