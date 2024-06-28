using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ChamadosApi.Models;
using ChamadosApi.Data;

namespace ChamadosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _context;

        public AutenticacaoController(IConfiguration config, ApplicationDbContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Usuario model)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == model.Email && u.Senha == model.Senha);

            if (user == null)
            {
                return Unauthorized(new { message = "Email ou senha inválidos" });
            }

            var tokenString = GenerateJwtToken(user);

            return Ok(new { token = tokenString });
        }

        private string GenerateJwtToken(Usuario user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
