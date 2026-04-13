using JobBoard.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JobBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {

        private readonly IApplicationService _applicationService;

        public ApplicationsController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        private int GetUserId() =>
            int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        [HttpPost("apply/{jobId}")]
        public async Task<IActionResult> Apply(int jobId) =>
            Ok(await _applicationService.Apply(jobId, GetUserId()));

        [HttpPut("status/{applicationId}")]
        public async Task<IActionResult> UpdateStatus(int applicationId, [FromQuery] string status) =>
            Ok(await _applicationService.UpdateStatus(applicationId, status, GetUserId()));

        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetByJob(int jobId) =>
            Ok(await _applicationService.GetApplicationsByJob(jobId, GetUserId()));

        [HttpGet("my")]
        public async Task<IActionResult> GetMine() =>
            Ok(await _applicationService.GetMyApplications(GetUserId()));
    }
}
