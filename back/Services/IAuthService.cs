using back.Dtos;
using JobBoard.Dtos;

namespace JobBoard.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> Register (RegisterDto dto);
        Task<AuthResponseDto> Login (LoginDto dto);
    }
}
