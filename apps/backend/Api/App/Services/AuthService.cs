using Api.App.Models;
using Api.App.Interface;
using Microsoft.EntityFrameworkCore;
using Api.Database.Context;

namespace Api.App.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;

    public AuthService(AppDbContext db, IJwtService jwt)
    {
        _db = db;
        _jwt = jwt;
    }

    public async Task<(string, string)> RegisterAsync(string name, string email, string password)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Name = name,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return await GenerateTokens(user);
    }

    public async Task<(string, string)> LoginAsync(string email, string password)
    {
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Email == email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException();

        return await GenerateTokens(user);
    }

    private async Task<(string, string)> GenerateTokens(User user)
    {
        var access = _jwt.GenerateAccessToken(user);
        var refresh = _jwt.GenerateRefreshToken();

        _db.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            Token = refresh,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        });

        await _db.SaveChangesAsync();

        return (access, refresh);
    }
}