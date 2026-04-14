using AutoMapper;
using JobBoard.Data;
using JobBoard.Dtos;
using JobBoard.Models;
using Microsoft.EntityFrameworkCore;

namespace JobBoard.Services
{
    public class JobService : IJobService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public JobService(AppDbContext context , IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<string> CreateJob(CreateJobDto dto, int clientId)
        {
            var job = _mapper.Map<Job>(dto);
            job.ClientId = clientId;

            _context.Add(job);
            await _context.SaveChangesAsync();
            return "Job created successfully";
        }

        public async Task<string> DeleteJob(int id, int clientId)
        {
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
            if (job == null)
                return "No Jobs Found";
            _context.Remove(job);
            await _context.SaveChangesAsync();
            return "Job deleted successfully";
        }

        public async Task<List<JobResponseDto>> GetAllJobs()
        {
           var jobs = await _context.Jobs
                .Include(j => j.Client)
                .Where(j => j.Status =="open")
                .ToListAsync();

            return _mapper.Map<List<JobResponseDto>>(jobs);
        }

        public async Task<JobResponseDto> GetJobById(int id)
        {
            var job = await _context.Jobs
                .Include(j => j.Client)
                .FirstOrDefaultAsync(j => j.Id == id);

            return _mapper.Map<JobResponseDto>(job);
        }
    }
}
