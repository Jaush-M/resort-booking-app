using Api.App.Models;

namespace Api.App.Interface;

public interface IJwtService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}