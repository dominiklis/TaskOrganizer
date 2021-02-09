using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Filter;
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
        public async Task<ActionResult> Get([FromQuery] TasksFilterDTO filters)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);

            var tasksQueryable = _context.TaskModels
                .Where(x => x.UserTasks.Any(y => y.UserId == user.Id))
                .Include(x => x.User)
                .AsQueryable();

            DateTime start = DateTime.UtcNow.Date;
            DateTime end = start.AddDays(7);

            if (!string.IsNullOrWhiteSpace(filters.StartDate))
            {
                Int32 startDateTimestamp;

                bool success = Int32.TryParse(filters.StartDate, out startDateTimestamp);
                if (success && startDateTimestamp >= 0)
                {
                    start = DateTimeOffset.FromUnixTimeSeconds(startDateTimestamp).LocalDateTime;
                }
            }

            if (!string.IsNullOrWhiteSpace(filters.EndDate))
            {
                Int32 endDateTimestamp;

                bool success = Int32.TryParse(filters.EndDate, out endDateTimestamp);
                if (success && endDateTimestamp >= 0)
                {
                    end = DateTimeOffset.FromUnixTimeSeconds(endDateTimestamp).LocalDateTime;
                }
            }

            tasksQueryable = tasksQueryable.Where(x => x.StartDate >= start && x.StartDate < end);

            if (!string.IsNullOrWhiteSpace(filters.Completed))
            {
                bool c;
                if (Boolean.TryParse(filters.Completed, out c))
                {
                    tasksQueryable = tasksQueryable.Where(x => x.Completed == c);
                }
            }

            if (!string.IsNullOrWhiteSpace(filters.Search))
            {
                tasksQueryable = tasksQueryable.Where(x => x.Title.Contains(filters.Search));
            }

            if (!string.IsNullOrWhiteSpace(filters.Shared))
            {
                TasksFilterDTO.SharedFilter sf;
                if (Enum.TryParse(filters.Shared, true, out sf))
                {
                    if (sf == TasksFilterDTO.SharedFilter.SharedBy)
                    {
                        tasksQueryable = tasksQueryable.Where(x => x.User.UserName == user.UserName && x.UserTasks.Count > 1);
                    }
                    else
                    {
                        tasksQueryable = tasksQueryable.Where(x => x.User.UserName != user.UserName);
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(filters.Priority))
            {

                System.Diagnostics.Debug.WriteLine(filters.Priority);

                TasksFilterDTO.PriorityFilter pf;
                if (Enum.TryParse(filters.Priority, true, out pf))
                {
                    if (pf == TasksFilterDTO.PriorityFilter.Normal)
                    {
                        tasksQueryable = tasksQueryable.Where(x => x.Priority == 0);
                    }
                    else if (pf == TasksFilterDTO.PriorityFilter.High)
                    {
                        tasksQueryable = tasksQueryable.Where(x => x.Priority == 1);
                    }
                    else
                    {
                        tasksQueryable = tasksQueryable.Where(x => x.Priority == 2);
                    }
                }
            }

            if (!string.IsNullOrEmpty(filters.Limit))
            {
                int limit;
                if (Int32.TryParse(filters.Limit, out limit))
                {
                    tasksQueryable = tasksQueryable.Take(limit);
                }
            }

            List<TaskModel> tasksList = await tasksQueryable.Include(x => x.TaskTags).ThenInclude(t => t.Tag).ToListAsync();
            List<GetTaskDTO> tasksDTOs = _mapper.Map<List<GetTaskDTO>>(tasksList);

            var groupedTasks = tasksDTOs
                .GroupBy(tasksDTOs => tasksDTOs.StartDate.Date, tasksDTOs => tasksDTOs)
                .Select(t => new { t.Key, Count = t.Count(), Tasks = t.ToList().OrderBy(x => x.StartDate) });

            if (filters.SortOrder == "asc")
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

            var task = await _context.TaskModels
                .Include(x => x.UserTasks)
                .Where(x => x.UserTasks.Any(y => y.UserId == user.Id))
                .Include(x => x.User)
                .AsNoTracking()
                .Include(x => x.Steps)
                .Include(x => x.TaskTags).ThenInclude(t => t.Tag)
                .Include(x => x.Notes).ThenInclude(n => n.User)
                .FirstOrDefaultAsync(x =>  x.Id == id);

            if (task == null)
            {
                return Unauthorized();
            }

            if (task == null)
            {
                return NotFound();
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

            UserTask userTask = new UserTask() { User = user, UserId = user.Id, Task = newTask, TaskId = newTask.Id };
            _context.Add(userTask);

            // await _context.SaveChangesAsync();

            if (task.Tags != null)
            {
                task.Tags = task.Tags.Distinct().ToList();
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

            //task = _mapper.Map(taskToUpdate, task);
            if (taskToUpdate.EditDates)
            {
                task.StartDate = DateTime.Parse(taskToUpdate.StartDate, CultureInfo.InvariantCulture, DateTimeStyles.None);
                task.HasStartTime = taskToUpdate.HasStartTime;
                if (taskToUpdate.EndDate == null)
                {
                    task.EndDate = null;
                }
                else
                {
                    task.EndDate = DateTime.Parse(taskToUpdate.EndDate, CultureInfo.InvariantCulture, DateTimeStyles.None);
                }
            }

            if (taskToUpdate.EditTags)
            {
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
            }

            await _context.SaveChangesAsync();

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
