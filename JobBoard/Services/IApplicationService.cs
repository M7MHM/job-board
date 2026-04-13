using JobBoard.Dtos;

namespace JobBoard.Services
{
    public interface IApplicationService
    {
        Task<string> Apply(int jobId, int freelancerId);
        Task<string> UpdateStatus(int applicationId, string status, int clientId);
        Task<List<ApplicationResponseDto>> GetApplicationsByJob(int jobId, int clientId);
        Task<List<ApplicationResponseDto>> GetMyApplications(int freelancerId);
    }
}
