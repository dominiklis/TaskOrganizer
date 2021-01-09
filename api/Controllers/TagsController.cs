using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Tasks;
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
    public class TagsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public TagsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{tagName}")]
        public async Task<ActionResult> Get(string tagName)
        {
            ApplicationUser user = await _context.Users.FirstAsync(x => x.UserName == HttpContext.User.Identity.Name);

            List<TaskModel> tasks = await _context.TaskModels
                .Include(x => x.UserTasks)
                .Where(x => x.UserTasks.Any(y => y.UserId == user.Id))
                .Include(x => x.User)
                .Include(x => x.Steps)
                .Include(x => x.TaskTags).ThenInclude(t => t.Tag)
                .Where(r => r.TaskTags.Any(rt => rt.Tag.Name == tagName))
                .ToListAsync();

            List<GetTaskDTO> tasksDTOs = _mapper.Map<List<GetTaskDTO>>(tasks);

            var groupedTasks = tasksDTOs
                .GroupBy(tasksDTOs => tasksDTOs.StartDate.Date, tasksDTOs => tasksDTOs)
                .Select(t => new { t.Key, Count = t.Count(), Tasks = t.ToList() });

            groupedTasks = groupedTasks.OrderBy(x => x.Key);

            return Ok(groupedTasks);
        }
    }
}
