namespace Api.App.Models;

public class User
{
    public Guid Id { get; set; }

    public string Name { get; set; } = default!;
    public string Email { get; set; } = default!;
    public bool EmailVerified { get; set; }

    public string PasswordHash { get; set; } = default!;

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}