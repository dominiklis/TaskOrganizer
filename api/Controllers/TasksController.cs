using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Tasks;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TasksController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> Get(
            [FromQuery] string startDate = null, 
            [FromQuery] string endDate = null, 
            [FromQuery] string sortOrder = "asc"
            )
        {
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
            System.Diagnostics.Debug.WriteLine(startDate + " || " + endDate);
            List<TaskModel> tasks = await _context.TaskModels.Where(x => x.StartDate >= start && x.StartDate < end).ToListAsync();

            List<GetTaskDTO> tasksDTOs = _mapper.Map<List<GetTaskDTO>>(tasks);

            var groupedTasks = tasksDTOs.GroupBy(tasksDTOs => tasksDTOs.StartDate.Date, tasksDTOs => tasksDTOs)
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
            var task = await _context.TaskModels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return _mapper.Map<GetTaskDTO>(task);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddTaskDTO task)
        {
            TaskModel newTask = _mapper.Map<TaskModel>(task);
            /*TaskModel newTask = new TaskModel()
            {
                Title = task.Title,
                Description = task.Description,
                Added = DateTime.Now,
                Completed = false,
                StartDate = DateTime.Parse(task.StartDate, CultureInfo.InvariantCulture, DateTimeStyles.None),
                HasStartTime = task.HasStartTime,
            };

            if (task.EndDate != null)
            {
                newTask.EndDate = DateTime.Parse(task.EndDate, CultureInfo.InvariantCulture, DateTimeStyles.None);
            }

            newTask.Completed = false;*/

            _context.Add(newTask);
            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("getTaskById", new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] TaskModel taskToUpdate)
        {
            if (id != taskToUpdate.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskToUpdate).State = EntityState.Modified;

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
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            TaskModel taskToDelete = await _context.TaskModels.FindAsync(id);
            if (taskToDelete == null)
            {
                return NotFound();
            }

            _context.TaskModels.Remove(taskToDelete);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
