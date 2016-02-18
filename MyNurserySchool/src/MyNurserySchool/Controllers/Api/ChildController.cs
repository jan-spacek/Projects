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
using Microsoft.AspNet.Authorization;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
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
                var child = _repository.GetChildById(childId);

                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == child.NurseryId.ToString());
                if (User.IsInRole("Admin") || matchingNurs != null)
                {
                    if (child == null)
                        return Json(null);

                    return Json(Mapper.Map<ChildViewModel>(child));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get child {childId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding child id");
            }
            
            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json($"You are unauthorized to view this child {childId}");
        }

        [HttpPost("")]
        [Authorize(Roles = "Editor")]
        public JsonResult Post([FromBody]ChildViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var child = Mapper.Map<Child>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == _repository.GetClassNurseryId((int)vm.ClassId).ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
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
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json("Unauthorized to create new child in this nursery");
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
        [Authorize(Roles = "Editor")]
        public JsonResult Put([FromBody]ChildViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var child = Mapper.Map<Child>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == child.NurseryId.ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
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
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json("Unauthorized to save this child");
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
        [Authorize(Roles = "Editor")]
        public JsonResult Delete(int id)
        {
            try
            {
                var child = _repository.GetChildById(id);

                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == child.NurseryId.ToString());
                if (User.IsInRole("Admin") || matchingNurs != null)
                {
                    _repository.DeleteChild(id);
                    return Json(new { Message = "Deleted" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Message = "Unable to delete: " + ex });
            }

            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json("Unauthorized to delete this child");
        }
    }
}
