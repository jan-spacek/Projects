using AutoMapper;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Data;
using MyNurserySchool.Models;
using MyNurserySchool.ViewModels;
using System;
using System.Linq;
using System.Net;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
    [Route("api/class/")]
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

                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == result.NurseryId.ToString());
                if (User.IsInRole("Admin") || matchingNurs != null)
                {
                    if (result == null)
                        return Json(null);

                    return Json(Mapper.Map<ClassViewModel>(result));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get class {classId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding class id");
            }

            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json("Unauthorized to get this class");
        }
        
        [HttpPost("{nurseryId}")]
        [Authorize(Roles = "Editor")]
        public JsonResult Post(int nurseryId, [FromBody]ClassViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newClass = Mapper.Map<Class>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
                        newClass.Created = DateTime.Now;
                        newClass.CreatedBy = User.Identity.Name;
                        newClass.Modified = DateTime.Now;
                        newClass.ModifiedBy = User.Identity.Name;
                        newClass.NurseryId = nurseryId;

                        _repository.AddClass(nurseryId, newClass);

                        if (_repository.SaveAll())
                        {
                            Response.StatusCode = (int)HttpStatusCode.Created;
                            return Json(Mapper.Map<ClassViewModel>(newClass));
                        }
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json($"Unauthorized to create new class in nursery {nurseryId}");
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
        [Authorize(Roles = "Editor")]
        public JsonResult Put(int nurseryId, [FromBody]ClassViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newClass = Mapper.Map<Class>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
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
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json("Unauthorized to save this class");
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
        [Authorize(Roles = "Editor")]
        public JsonResult Delete(int id)
        {
            var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == _repository.GetClassNurseryId(id).ToString());
            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                _repository.DeleteClass(id);
                return Json(new { Message = "Deleted" });
            }
            else
            {
                Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                return Json("Unauthorized to delete this class");
            }
        }
    }
}
