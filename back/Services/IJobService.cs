using JobBoard.Dtos;

namespace JobBoard.Services
{
    public interface IJobService
    {
        Task<List<JobResponseDto>> GetAllJobs();
        Task<JobResponseDto> GetJobById(int id);
        Task<string> CreateJob(CreateJobDto dto, int clientId);
        Task<string> DeleteJob(int id, int clientId);
    }
}
