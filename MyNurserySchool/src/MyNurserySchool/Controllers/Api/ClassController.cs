using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Models;
using Microsoft.Extensions.Logging;
using System.Net;
using AutoMapper;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNurserySchool.Controllers.Api
{
    [Route("api/nursery/{nurseryId}/classes")]
    public class ClassController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<ClassController> _logger;

        public ClassController(INurseriesRepository repository, ILogger<ClassController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public JsonResult Get(int nurseryId)
        {
            try
            {
                var results = _repository.GetNurseryById(nurseryId);

                if (results == null)
                {
                    return Json(null);
                }

                return Json(Mapper.Map<IEnumerable<ClassViewModel>>(results.Classes)); // tu mozeme implementovat sortenie
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get classes for nursery {nurseryId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding nursery name");
            }
        }

        public JsonResult Post(int nurseryId, [FromBody]ClassViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newClass = Mapper.Map<Class>(vm);
                    
                    _repository.AddClass(nurseryId, newClass);

                    if(_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<ClassViewModel>(newClass));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new class", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new class");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new class");
        }
    }
}
