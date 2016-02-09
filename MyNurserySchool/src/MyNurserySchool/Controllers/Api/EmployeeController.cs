using Microsoft.Extensions.Logging;
using System.Net;
using AutoMapper;
using MyNurserySchool.ViewModels;
using MyNurserySchool.Data;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.Models;
using System;
using System.Collections.Generic;
using MyNurserySchool.Enums;

namespace MyNurserySchool.Controllers.Api
{
    [Route("Api/Employee/")]
    public class EmployeeController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<ClassController> _logger;

        public EmployeeController(INurseriesRepository repository, ILogger<ClassController> logger)
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

                if (result == null)
                {
                    return Json(null);
                }

                return Json(Mapper.Map<EmployeeViewModel>(result));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get class {employeeId}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding class id");
            }
        }

        [HttpPost("{nurseryId}")]
        public JsonResult Post(int nurseryId, [FromBody]EmployeeViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = Mapper.Map<Employee>(vm);
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
        public JsonResult Put(int nurseryId, [FromBody]EmployeeViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var employee = Mapper.Map<Employee>(vm);
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
        public JsonResult Delete(int id)
        {
            try {
                _repository.DeleteEmployee(id);
                return Json(new { Message = "Deleted" });
            }
            catch (Exception ex)
            {
                return Json(new { Message = "Unable to delete: " + ex });
            }
        }
    }
}