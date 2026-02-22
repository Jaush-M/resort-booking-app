namespace Api.App.Models;

public class RefreshToken
{
    public Guid Id { get; set; }
    public string Token { get; set; } = default!;
    public DateTime ExpiresAt { get; set; }
    public bool Revoked { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
}