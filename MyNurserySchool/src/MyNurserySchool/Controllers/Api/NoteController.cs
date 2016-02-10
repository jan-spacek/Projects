using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MyNurserySchool.ViewModels;
using AutoMapper;
using MyNurserySchool.Data;
using Microsoft.Extensions.Logging;
using System.Net;
using MyNurserySchool.Models;

namespace MyNurserySchool.Controllers.Api
{
    [Route("Api/Note")]
    public class NoteController : Controller
    {
        private INurseriesRepository _repository;
        private ILogger<NoteController> _logger;

        public NoteController(INurseriesRepository repository, ILogger<NoteController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpPost]
        public JsonResult Post([FromBody]NoteViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var note = Mapper.Map<Note>(vm);
                    note.Created = DateTime.Now;
                    note.CreatedBy = User.Identity.Name;

                    _repository.AddNote(note);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<NoteViewModel>(note));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new note", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new note");
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new employee");
        }
        
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            try
            {
                _repository.DeleteNote(id);
                return Json(new { Message = "Deleted" });
            }
            catch (Exception ex)
            {
                return Json(new { Message = "Unable to delete: " + ex });
            }
        }
    }
}
