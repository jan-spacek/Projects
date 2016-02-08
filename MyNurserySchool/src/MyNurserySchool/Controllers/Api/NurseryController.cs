using System;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Models;
using System.Net;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.AspNet.Authorization;
using MyNurserySchool.Data;
using MyNurserySchool.ViewModels;
using System.Collections.Generic;
using MyNurserySchool.Enums;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
    [Route("Api/Nursery/")]
    public class NurseryController : Controller
    {
        private ILogger<NurseryController> _logger;
        private INurseriesRepository _repository;

        public NurseryController(INurseriesRepository repository, ILogger<NurseryController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            if (_repository.HasAccess(id, User.Identity.Name))
            {
                return Json(Mapper.Map<NurseryViewModel>(_repository.GetNurseryById(id)));
            }

            _logger.LogInformation("Attempting to get unauthorized nursery");
            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json(new { Message = "Do not have permissionts to view this item" });
        }

        [HttpPut("")]
        public JsonResult Put([FromBody] NurseryViewModel vm)
        {
            try
            {
                var nursery = Mapper.Map<Nursery>(vm);
                nursery.Address = vm.Address;
                nursery.Modified = DateTime.Now;
                nursery.ModifiedBy = User.Identity.Name;

                _repository.SaveNursery(nursery);
                _repository.SaveAddress(nursery.Address);

                if (_repository.SaveAll())
                {
                    return Json(Mapper.Map<NurseryViewModel>(nursery));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save nursery", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new
                {
                    Message = ex.Message
                });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });   
        }

        [HttpPost("")]
        public JsonResult Post([FromBody] NurseryViewModel vm)
        {
            try {
                if (ModelState.IsValid && User.Identity.Name == "admin")
                {
                    var nursery = Mapper.Map<Nursery>(vm);
                    nursery.Address = vm.Address;
                    nursery.Modified = DateTime.Now;
                    nursery.ModifiedBy = User.Identity.Name;
                    nursery.CreatedBy = User.Identity.Name;
                    nursery.Created = DateTime.Now;
                    if (User.Identity.Name != "admin")
                        nursery.AllowedUsers = "admin;" + User.Identity.Name;
                    else
                        nursery.AllowedUsers = "admin";

                    _logger.LogInformation("Attempting to save nursery");
                    _repository.AddAddress(nursery.Address);
                    _repository.AddNursery(nursery);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<NurseryViewModel>(nursery));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new nursery", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });            
        }
        
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            _repository.DeleteNursery(id);
            return Json(new { Message = "Deleted" });
        }

        [HttpGet("AttendanceStates")]
        public JsonResult GetAttendanceStates()
        {
            var enumVals = new List<object>();

            foreach (var item in Enum.GetValues(typeof(AttendanceState)))
            {
                enumVals.Add(new
                {
                    id = (int)item,
                    name = item.ToString()
                });
            }

            return Json(enumVals);
        }
    }
}
