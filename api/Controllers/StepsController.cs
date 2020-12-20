using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Steps;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public StepsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetStepDTO>>> Get()
        {
            var steps = await _context.Steps.ToListAsync();
            return _mapper.Map<List<GetStepDTO>>(steps);
        }

        [HttpGet("{id}", Name = "GetStepById")]
        public async Task<ActionResult<GetStepDTO>> Get(int id)
        {
            var step = await _context.Steps.FirstOrDefaultAsync(x => x.Id == id);
            if (step == null)
            {
                return NotFound();
            }

            return _mapper.Map<GetStepDTO>(step);
        }

        [HttpPost]
        public async Task<ActionResult<List<GetStepDTO>>> Post([FromBody] AddStepDTO step)
        {
            Step newStep = new Step();
            newStep.Text = step.Text;
            newStep.Task = await _context.TaskModels.FirstOrDefaultAsync(x => x.Id == step.Task);
            newStep.Completed = false;

            _context.Add(newStep);
            await _context.SaveChangesAsync();
            return new CreatedAtRouteResult("GetStepById", new { id = newStep.Id }, newStep);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> Patch(int id, [FromBody] JsonPatchDocument<Step> patchDoc)
        {
            Step step = await _context.Steps.FirstOrDefaultAsync(x => x.Id == id);
            if (step == null)
            {
                return NotFound();
            }

            if (patchDoc == null)
            {
                return BadRequest();
            }

            patchDoc.ApplyTo(step, ModelState);

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
            Step stepToDelete = await _context.Steps.FindAsync(id);
            if (stepToDelete == null)
            {
                return NotFound();
            }

            _context.Steps.Remove(stepToDelete);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
