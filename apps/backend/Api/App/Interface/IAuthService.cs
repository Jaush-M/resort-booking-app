namespace Api.App.Interface;

public interface IAuthService
{
    Task<(string access, string refresh)> RegisterAsync(string name, string email, string password);
    Task<(string access, string refresh)> LoginAsync(string email, string password);
}