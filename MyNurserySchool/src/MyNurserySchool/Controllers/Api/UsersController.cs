using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Data;

namespace MyNurserySchool.Controllers.Api
{
    [Authorize]
    public class UsersController : Controller
    {
        private ILogger<NurseriesController> _logger;
        private INurseriesRepository _repository;

        public UsersController(INurseriesRepository repository, ILogger<NurseriesController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("api/users/")]
        public JsonResult GetUsers()
        {
            var results = _repository.GetAllUsers();
            return Json(results);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("api/roles/")]
        public JsonResult GetRoles()
        {
            var results = _repository.GetAllRoles();
            return Json(results);
        }
    }
}
