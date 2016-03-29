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
using System.Linq;

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
            var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == id.ToString());

            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                return Json(Mapper.Map<NurseryViewModel>(_repository.GetNurseryById(id)));
            }

            _logger.LogInformation("Attempting to get unauthorized nursery");
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Do not have permissionts to view this item" });
        }

        [HttpPut("")]
        [Authorize(Roles = "Editor")]
        public JsonResult Put([FromBody] NurseryViewModel vm)
        {
            try
            {
                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == vm.Id.ToString());

                if (User.IsInRole("Admin") || matchingNurs != null)
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
        [Authorize(Roles = "Admin")]
        public JsonResult Post([FromBody] NurseryViewModel vm)
        {
            try {
                if (ModelState.IsValid)
                {
                    var nursery = Mapper.Map<Nursery>(vm);
                    nursery.Address = vm.Address;
                    nursery.Modified = DateTime.Now;
                    nursery.ModifiedBy = User.Identity.Name;
                    nursery.CreatedBy = User.Identity.Name;
                    nursery.Created = DateTime.Now;

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
        [Authorize(Roles = "Admin")]
        public JsonResult Delete(int id)
        {
            _repository.DeleteNursery(id);
            return Json(new { Message = "Deleted" });
        }

        [HttpGet("{nurseryId}/Children")]
        public JsonResult GetChildren(int nurseryId)
        {
            var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());

            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                var results = Mapper.Map<IEnumerable<ChildViewModel>>(_repository.GetAllChildren(nurseryId));
                return Json(results);
            }

            _logger.LogInformation("Attempting to get unauthorized nursery");
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Do not have permissionts to view this item" });
        }

        [HttpGet("{nurseryId}/Employees")]
        public JsonResult GetEmpoyees(int nurseryId)
        {
            var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());

            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                var results = Mapper.Map<IEnumerable<EmployeeViewModel>>(_repository.GetAllEmployees(nurseryId));
                return Json(results);
            }

            _logger.LogInformation("Attempting to get unauthorized nursery");
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Do not have permissionts to view this item" });
        }

        [HttpGet("{nurseryId}/Classes")]
        public JsonResult GetClasses(int nurseryId)
        {
            var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());

            if (User.IsInRole("Admin") || matchingNurs != null)
            {
                var results = Mapper.Map<IEnumerable<ClassViewModel>>(_repository.GetAllClasses(nurseryId));
                return Json(results);
            }

            _logger.LogInformation("Attempting to get unauthorized nursery");
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Do not have permissionts to view this item" });
        }
    }
}
