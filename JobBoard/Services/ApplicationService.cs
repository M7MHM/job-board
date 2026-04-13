using AutoMapper;
using JobBoard.Data;
using JobBoard.Dtos;
using JobBoard.Models;
using Microsoft.EntityFrameworkCore;

namespace JobBoard.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ApplicationService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Apply(int jobId, int freelancerId)
        {
            var job = await _context.Jobs.FindAsync(jobId);
            if (job == null || job.Status == "Closed") return "Job not available";

            var exists = await _context.Applications
                .AnyAsync(a => a.JobId == jobId && a.FreelancerId == freelancerId);
            if (exists) return "Already applied";

            _context.Applications.Add(new Application
            {
                JobId = jobId,
                FreelancerId = freelancerId,
                Status = "Pending"
            });

            await _context.SaveChangesAsync();
            return "Applied successfully";
        }

        public async Task<string> UpdateStatus(int applicationId, string status, int clientId)
        {
            var application = await _context.Applications
                .Include(a => a.Job)
                .FirstOrDefaultAsync(a => a.Id == applicationId && a.Job.ClientId == clientId);

            if (application == null) return "Not found";

            application.Status = status;
            await _context.SaveChangesAsync();
            return "Status updated";
        }

        public async Task<List<ApplicationResponseDto>> GetApplicationsByJob(int jobId, int clientId)
        {
            var applications = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Freelancer)
                .Where(a => a.JobId == jobId && a.Job.ClientId == clientId)
                .ToListAsync();

            return _mapper.Map<List<ApplicationResponseDto>>(applications);
        }

        public async Task<List<ApplicationResponseDto>> GetMyApplications(int freelancerId)
        {
            var applications = await _context.Applications
                .Include(a => a.Job)
                .Include(a => a.Freelancer)
                .Where(a => a.FreelancerId == freelancerId)
                .ToListAsync();

            return _mapper.Map<List<ApplicationResponseDto>>(applications);
        }
    }
}
