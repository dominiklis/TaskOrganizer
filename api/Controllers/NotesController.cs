using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Notes;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [EnableCors(PolicyName = "CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public NotesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddNoteDTO noteDTO)
        {
            // check if task exists
            TaskModel task = _context.TaskModels.Include(x => x.UserTasks).FirstOrDefault(x => x.Id == noteDTO.TaskId);
            if (task == null)
            {
                return NotFound();
            }

            // check that user adding the note is the author of task or a user with access to the task
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (!task.UserTasks.Any(x => x.UserId == user.Id))
            {
                return Unauthorized();
            }

            // check if note content is not empty
            if (String.IsNullOrEmpty(noteDTO.Text))
            {
                return BadRequest();
            }

            Note newNote = new Note() { Task = task, User = user, Text = noteDTO.Text, Added = DateTime.Now };
            _context.Add(newNote);
            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetNoteById", new { id = newNote.Id }, _mapper.Map<GetNoteDTO>(newNote));
        }

        [HttpGet("task/{taskId}")]
        public async Task<ActionResult<IEnumerable<GetNoteDTO>>> GetTaskComments(int taskId)
        {
            // check if user has access to task
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            TaskModel task = await _context.TaskModels.Include(x => x.UserTasks).FirstOrDefaultAsync(x => x.Id == taskId);
            if (!task.UserTasks.Any(x => x.UserId == user.Id))
            {
                return Unauthorized();
            }

            List<Note> notes = await _context.Notes.Where(x => x.Task.Id == taskId).ToListAsync();

            return _mapper.Map<List<GetNoteDTO>>(notes);
        }


        [HttpGet("{id}", Name = "GetNoteById")]
        public async Task<ActionResult<GetNoteDTO>> Get(int id)
        {
            // check if note exists
            Note note = await _context.Notes.Include(x => x.Task).FirstOrDefaultAsync(x => x.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            // check if user has access to the task
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            TaskModel task = await _context.TaskModels.Include(x => x.UserTasks).FirstOrDefaultAsync(x => x.Id == note.Task.Id);
            if (!task.UserTasks.Any(x => x.UserId == user.Id))
            {
                return Unauthorized();
            }

            return _mapper.Map<GetNoteDTO>(note);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] JsonPatchDocument<Note> patchDoc)
        {
            // check if note exists
            Note note = await _context.Notes.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            // check if user is author of the note
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (note.User != user)
            {
                return Unauthorized();
            }

            // check if patch document is not null
            if (patchDoc == null)
            {
                return BadRequest();
            }

            patchDoc.ApplyTo(note, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            // check if note exists
            Note note = await _context.Notes.Include(x => x.User).Include(x => x.Task).FirstOrDefaultAsync(x => x.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            // check if user is the author of the note or task
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            TaskModel task = await _context.TaskModels.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == note.Task.Id);
            if ((note.User != user) && (task.User != user))
            {
                return Unauthorized();
            }

            _context.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
