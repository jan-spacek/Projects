using System;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Models;
using Microsoft.Extensions.Logging;
using System.Net;
using AutoMapper;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Data;

namespace MyNurserySchool.Controllers.Api
{
    [Route("Api/Class/")]
    public class ClassController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<ClassController> _logger;

        public ClassController(INurseriesRepository repository, ILogger<ClassController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("{classId}")]
        public JsonResult Get(int classId)
        {
            try
            {
                var result = _repository.GetClassById(classId);

                if (result == null)
                {
                    return Json(null);
                }

                return Json(Mapper.Map<ClassViewModel>(result)); // tu mozeme implementovat sortenie
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get class {classId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding class id");
            }
        }

        [HttpPost("{nurseryId}")]
        public JsonResult Post(int nurseryId, [FromBody]ClassViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newClass = Mapper.Map<Class>(vm);
                    newClass.Created = DateTime.Now;
                    newClass.CreatedBy = User.Identity.Name;
                    newClass.Modified = DateTime.Now;
                    newClass.ModifiedBy = User.Identity.Name;
                    newClass.NurseryId = nurseryId;


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

        [HttpPut("{nurseryId}")]
        public JsonResult Put(int nurseryId, [FromBody]ClassViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newClass = Mapper.Map<Class>(vm);
                    newClass.Modified = DateTime.Now;
                    newClass.ModifiedBy = User.Identity.Name;
                    newClass.NurseryId = nurseryId;

                    _repository.SaveClass(newClass);

                    if (_repository.SaveAll())
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

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _repository.DeleteClass(id);
            return Json(new { Message = "Deleted" });
        }
    }
}
