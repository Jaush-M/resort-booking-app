using Api.App.Http.Requests;
using Api.App.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api.App.Http.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var (access, refresh) = await _auth.RegisterAsync(request.Name, request.Email, request.Password);
        SetCookies(access, refresh);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var (access, refresh) = await _auth.LoginAsync(request.Email, request.Password);
        SetCookies(access, refresh);
        return Ok();
    }

    private void SetCookies(string access, string refresh)
    {
        Response.Cookies.Append("access_token", access, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });

        Response.Cookies.Append("refresh_token", refresh, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict
        });
    }
}