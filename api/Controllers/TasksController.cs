using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
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

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        //public async Task<ActionResult<List<TaskModel>>> Get()
        public async Task<ActionResult> Get([FromQuery] string startDate = null, [FromQuery] string endDate = null, [FromQuery] string sortOrder = "asc")
        {
            DateTime start = DateTime.UtcNow.Date;
            DateTime end = start.AddDays(3);

            if (startDate != null)
            {
                Int32 startDateTimestamp;

                bool success = Int32.TryParse(startDate, out startDateTimestamp);
                if (success && startDateTimestamp >= 0)
                {
                    start = DateTimeOffset.FromUnixTimeSeconds(startDateTimestamp).DateTime;
                }
            }

            if (endDate != null)
            {
                Int32 endDateTimestamp;

                bool success = Int32.TryParse(endDate, out endDateTimestamp);
                if (success && endDateTimestamp >= 0)
                {
                    end = DateTimeOffset.FromUnixTimeSeconds(endDateTimestamp).DateTime;
                }
            }
            System.Diagnostics.Debug.WriteLine(startDate + " || " + endDate);
            List<TaskModel> tasks = await _context.TaskModels.Where(x => x.StartDate >= start && x.StartDate < end).ToListAsync();

            var groupedTasks = tasks.GroupBy(task => task.StartDate.Date, task => task)
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
        public async Task<ActionResult<TaskModel>> Get(int id)
        {
            var task = await _context.TaskModels.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TaskModel task)
        {
            _context.Add(task);
            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("getTaskById", new { id = task.Id }, task);
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
