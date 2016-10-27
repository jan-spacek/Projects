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
    [Route("api/employee/")]
    public class EmployeeController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<EmployeeController> _logger;

        public EmployeeController(INurseriesRepository repository, ILogger<EmployeeController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("{employeeId}")]
        public JsonResult Get(int employeeId)
        {
            try
            {
                var result = _repository.GetEmployeeById(employeeId);

                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == result.NurseryId.ToString());
                if (User.IsInRole("Admin") || matchingNurs != null)
                {
                    if (result == null)
                        return Json(null);

                    return Json(Mapper.Map<EmployeeViewModel>(result));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get class {employeeId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding class id");
            }

            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json("Unauthorized to view this employee");
        }

        [HttpPost("{nurseryId}")]
        [Authorize(Roles = "Editor")]
        public JsonResult Post(int nurseryId, [FromBody]EmployeeViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = Mapper.Map<Employee>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == nurseryId.ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
                        employee.Created = DateTime.Now;
                        employee.CreatedBy = User.Identity.Name;
                        employee.Modified = DateTime.Now;
                        employee.ModifiedBy = User.Identity.Name;
                        employee.NurseryId = nurseryId;

                        _repository.AddEmployee(employee);

                        if (_repository.SaveAll())
                        {
                            Response.StatusCode = (int)HttpStatusCode.Created;
                            return Json(Mapper.Map<EmployeeViewModel>(employee));
                        }
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json("Unauthorized to create employees in this nursery");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new employee", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new employee");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new employee");
        }

        [HttpPut("{nurseryId}")]
        [Authorize(Roles = "Editor")]
        public JsonResult Put(int nurseryId, [FromBody]EmployeeViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = Mapper.Map<Employee>(vm);

                    var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == employee.NurseryId.ToString());
                    if (User.IsInRole("Admin") || matchingNurs != null)
                    {
                        employee.Modified = DateTime.Now;
                        employee.ModifiedBy = User.Identity.Name;
                        employee.NurseryId = nurseryId;

                        if (employee.Address != null)
                            _repository.SaveAddress(employee.Address);
                        _repository.SaveEmployee(employee);

                        if (_repository.SaveAll())
                        {
                            Response.StatusCode = (int)HttpStatusCode.OK;
                            return Json(Mapper.Map<EmployeeViewModel>(employee));
                        }
                    }
                    else
                    {
                        Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Json("Unauthorized to save this employee");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save employee", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save employee");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on employee");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor")]
        public JsonResult Delete(int id)
        {
            try {
                var matchingNurs = User.FindAll("Nursery").FirstOrDefault(claim => claim.Value == _repository.GetEmployeeNurseryId(id).ToString());
                if (User.IsInRole("Admin") || matchingNurs != null)
                {
                    _repository.DeleteEmployee(id);
                    return Json(new { Message = "Deleted" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Message = "Unable to delete: " + ex });
            }

            Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Json("Unauthorized to delete this employee");
        }
    }
}