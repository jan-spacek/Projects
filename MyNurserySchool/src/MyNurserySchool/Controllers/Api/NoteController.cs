using AutoMapper;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using MyNurserySchool.Data;
using MyNurserySchool.Models;
using MyNurserySchool.ViewModels;
using System;
using System.Net;

namespace MyNurserySchool.Controllers.Api
{
    [Route("api/note")]
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
        [Authorize(Roles = "Editor")]
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
        [Authorize(Roles = "Editor")]
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
