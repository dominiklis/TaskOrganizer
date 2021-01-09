using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.UserTasks;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [EnableCors(PolicyName = "CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserTasksController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddUserTaskDTO userTask)
        {
            ApplicationUser userToAdd = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userTask.Email);
            if (userToAdd == null)
            {
                return NotFound($"user {userTask.Email} not found");
            }

            TaskModel task = await _context.TaskModels.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == userTask.Id);
            if (task == null)
            {
                return NotFound("task not found");
            }

            ApplicationUser author = await _context.Users.FirstOrDefaultAsync(x => x.UserName == HttpContext.User.Identity.Name);
            if (task.User.UserName != author.UserName)
            {
                return Unauthorized();
            }

            UserTask newUserTask = new UserTask() { User = userToAdd, UserId = userToAdd.Id, Task = task, TaskId = task.Id };
            _context.Add(newUserTask);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
