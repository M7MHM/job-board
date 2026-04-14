using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back.Dtos
{
    public class AuthResponseDto
    {
    public bool IsSuccess { get; set; }
    public string? Token { get; set; }
    public string? Message { get; set; }
    }
}