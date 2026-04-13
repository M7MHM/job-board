using JobBoard.Dtos;

namespace JobBoard.Services
{
    public interface IAuthService
    {
        Task<string> Register (RegisterDto dto);
        Task<string> Login (LoginDto dto);
    }
}
