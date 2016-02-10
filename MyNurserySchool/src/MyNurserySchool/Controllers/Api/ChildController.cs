using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Data;
using Microsoft.Extensions.Logging;
using AutoMapper;
using System.Net;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Models;

namespace MyNurserySchool.Controllers.Api
{
    [Route("Api/Child")]
    public class ChildController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<ChildController> _logger;

        public ChildController(INurseriesRepository repository, ILogger<ChildController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("{childId}")]
        public JsonResult Get(int childId)
        {
            try
            {
                var result = _repository.GetChildById(childId);

                if (result == null)
                {
                    return Json(null);
                }

                return Json(Mapper.Map<ChildViewModel>(result));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get class {childId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding class id");
            }
        }

        [HttpPost("")]
        public JsonResult Post([FromBody]ChildViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var child = Mapper.Map<Child>(vm);
                    child.Created = DateTime.Now;
                    child.CreatedBy = User.Identity.Name;
                    child.Modified = DateTime.Now;
                    child.ModifiedBy = User.Identity.Name;

                    _repository.AddChild(child);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<ChildViewModel>(child));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new child", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new child");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new child");
        }

        [HttpPut("")]
        public JsonResult Put([FromBody]ChildViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var child = Mapper.Map<Child>(vm);
                    child.Modified = DateTime.Now;
                    child.ModifiedBy = User.Identity.Name;

                    if (child.Address != null)
                        _repository.SaveAddress(child.Address);
                    _repository.SaveChild(child);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.OK;
                        return Json(Mapper.Map<ChildViewModel>(child));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save child", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save child");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on child");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                _repository.DeleteChild(id);
                return Json(new { Message = "Deleted" });
            }
            catch (Exception ex)
            {
                return Json(new { Message = "Unable to delete: " + ex });
            }
        }
    }
}
