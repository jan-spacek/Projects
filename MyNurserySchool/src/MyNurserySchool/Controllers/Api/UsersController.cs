using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Data;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize(Roles = "Admin")]
    public class UsersController : Controller
    {
        private ILogger<NurseriesController> _logger;
        private INurseriesRepository _repository;

        public UsersController(INurseriesRepository repository, ILogger<NurseriesController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("Api/Users/")]
        public JsonResult Get()
        {
            var results = _repository.GetAllUsers();
            return Json(results);
        }

        [HttpGet("Api/Roles/")]
        public JsonResult GetRoles()
        {
            var results = _repository.GetAllRoles();
            return Json(results);
        }
    }
}
