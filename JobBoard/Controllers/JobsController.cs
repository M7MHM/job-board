using JobBoard.Dtos;
using JobBoard.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {

        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll() =>
            Ok(await _jobService.GetAllJobs());

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id) =>
            Ok(await _jobService.GetJobById(id));

        [HttpPost]
        public async Task<IActionResult> Create(CreateJobDto dto) =>
            Ok(await _jobService.CreateJob(dto, GetUserId()));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id) =>
            Ok(await _jobService.DeleteJob(id, GetUserId()));
    }
}
