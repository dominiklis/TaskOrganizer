using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Tasks;
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
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly Regex rgx = new Regex("[^a-zA-Z0-9 -]");

        public TasksController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Get(
            [FromQuery] string startDate = null, 
            [FromQuery] string endDate = null, 
            [FromQuery] string sortOrder = "asc",
            [FromQuery] string completed = "true",
            [FromQuery] string inCompleted = "true",
            [FromQuery] string search = "")
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            DateTime start = DateTime.UtcNow.Date;
            DateTime end = start.AddDays(3);

            if (startDate != null)
            {
                Int32 startDateTimestamp;

                bool success = Int32.TryParse(startDate, out startDateTimestamp);
                if (success && startDateTimestamp >= 0)
                {
                    start = DateTimeOffset.FromUnixTimeSeconds(startDateTimestamp).LocalDateTime;
                }
            }

            if (endDate != null)
            {
                Int32 endDateTimestamp;

                bool success = Int32.TryParse(endDate, out endDateTimestamp);
                if (success && endDateTimestamp >= 0)
                {
                    end = DateTimeOffset.FromUnixTimeSeconds(endDateTimestamp).LocalDateTime;
                }
            }

            bool cmp = Boolean.Parse(completed);
            bool inCmp = Boolean.Parse(inCompleted);

            List<TaskModel> tasks = await _context
                .TaskModels.Include(x => x.User)
                .Where(x => x.User.UserName == user.UserName)
                .Where(x => x.StartDate >= start && x.StartDate < end)
                .Where(x => x.Completed == cmp || x.Completed == !inCmp)
                .Where(x => x.Title.Contains(search))
                .Include(x => x.Steps)
                .Include(x => x.TaskTags).ThenInclude(t => t.Tag)
                .ToListAsync();

            List<GetTaskDTO> tasksDTOs = _mapper.Map<List<GetTaskDTO>>(tasks);

            var groupedTasks = tasksDTOs
                .GroupBy(tasksDTOs => tasksDTOs.StartDate.Date, tasksDTOs => tasksDTOs)
                .Select(t => new { t.Key, Count = t.Count(), Tasks = t.ToList() });

            if (sortOrder == "asc")
            {
                groupedTasks = groupedTasks.OrderBy(x => x.Key);
            }
            else
            {
                groupedTasks = groupedTasks.OrderByDescending(x => x.Key);
            }

            return Ok(groupedTasks);
        }

        [HttpGet("{id}", Name = "GetTaskById")]
        public async Task<ActionResult<GetTaskDTO>> Get(int id)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            var task = await _context
                .TaskModels
                .Include(x => x.User)
                .AsNoTracking()
                .Include(x => x.Steps)
                .Include(x => x.TaskTags).ThenInclude(t => t.Tag)
                .FirstOrDefaultAsync(x =>  x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            if (task.User.UserName != user.UserName)
            {
                return Unauthorized();
            }

            return _mapper.Map<GetTaskDTO>(task);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddTaskDTO task)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            TaskModel newTask = _mapper.Map<TaskModel>(task);
            newTask.User = user;

            _context.Add(newTask);
            await _context.SaveChangesAsync();

            if (task.Tags != null)
            {
                foreach (string newTag in task.Tags)
                {
                    string newTagToAdd = rgx.Replace(newTag, "");
                    if (newTagToAdd.Length == 0)
                    {
                        continue;
                    }

                    Tag tag = await _context.Tags.FirstOrDefaultAsync(X => X.Name == newTagToAdd.ToLower());
                    if (tag == null)
                    {
                        tag = new Tag() { Name = newTagToAdd.ToLower() };
                        _context.Add(tag);
                        await _context.SaveChangesAsync();
                    }

                    TaskTag taskTag = new TaskTag() { Task = newTask, TaskId = newTask.Id, Tag = tag, TagId = tag.Id };
                    _context.Add(taskTag);
                }
            }

            await _context.SaveChangesAsync();

            return new CreatedAtRouteResult("GetTaskById", new { id = newTask.Id }, _mapper.Map<GetTaskDTO>(newTask));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UpdateTaskDTO taskToUpdate)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);

            if (user == null)
            {
                return Unauthorized();
            }

            TaskModel task = await _context
                .TaskModels
                .Include(x => x.User)
                .Include(x => x.TaskTags).ThenInclude(t => t.Tag)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            if (task.User.UserName != user.UserName)
            {
                return Unauthorized();
            }

            task = _mapper.Map(taskToUpdate, task);
            await _context.SaveChangesAsync();

            taskToUpdate.Tags = taskToUpdate.Tags.Select(x => x.ToLower()).ToList();
            List<string> currentTags = task.TaskTags.Select(t => t.Tag.Name).ToList();
            
            foreach (string currentTag in currentTags) 
            {
                if (!taskToUpdate.Tags.Contains(currentTag))
                {
                    Tag tag = await _context.Tags.FirstOrDefaultAsync(x => x.Name == currentTag);
                    TaskTag taskTagToDelete = await _context.TaskTags.FirstOrDefaultAsync(x => x.Task == task && x.Tag == tag);
                    _context.Remove(taskTagToDelete);
                }
                else
                {
                    taskToUpdate.Tags.Remove(currentTag);
                }
            }

            foreach (string newTag in taskToUpdate.Tags)
            {
                string newTagToAdd = rgx.Replace(newTag, "");
                if (newTagToAdd.Length == 0)
                {
                    continue;
                }

                Tag tag = await _context.Tags.FirstOrDefaultAsync(X => X.Name == newTagToAdd);
                if (tag == null)
                {
                    tag = new Tag() { Name = newTagToAdd };
                    _context.Add(tag);
                    await _context.SaveChangesAsync();
                }

                TaskTag taskTag = new TaskTag() { Task = task, TaskId = task.Id, Tag = tag, TagId = tag.Id };
                _context.Add(taskTag);
            }

            await _context.SaveChangesAsync();
            /*_context.Entry(taskToUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TaskModels.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }*/

            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, [FromBody] JsonPatchDocument<TaskModel> patchDoc)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            TaskModel task = await _context.TaskModels.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            if (task.User.UserName != user.UserName)
            {
                return Unauthorized();
            }

            if (patchDoc == null)
            {
                return BadRequest();
            }

            patchDoc.ApplyTo(task, ModelState);

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
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (user == null)
            {
                return Unauthorized();
            }

            TaskModel task = await _context
                .TaskModels
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
            {
                return NotFound();
            }

            if (task.User.UserName != user.UserName)
            {
                return Unauthorized();
            }

            _context.TaskModels.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
