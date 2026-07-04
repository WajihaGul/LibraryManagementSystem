using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.UserDTO;
using LibraryManagementSystem.Entities;
using LibraryManagementSystem.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly ApplicationDBContext applicationDBContext;
        private readonly TokenService tokenService;


        public AuthorizeController(ApplicationDBContext applicationDBContext, TokenService tokenService)
        {
            this.applicationDBContext = applicationDBContext;
            this.tokenService = tokenService;
        }

        [HttpPost("register")]
        public IActionResult RegisterUser(AddUserDTO userDTO)
        {
            var data = applicationDBContext.Users
                .Any(u => u.Email == userDTO.Email);

            if (data)
            {
                return BadRequest("Email already registered");
            }

            var hashPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);

            var user = new User
            {
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                Password = hashPassword,
                Role = UserRole.Member,
                IsActive = true
            };

            applicationDBContext.Users.Add(user);
            applicationDBContext.SaveChanges();
            
            return Ok("Registration Successfull");
        }

        [HttpPost("login")]
        public IActionResult LoginUser(LoginDTO loginDTO)
        {
            var data = applicationDBContext.Users
                .FirstOrDefault(u => u.Email == loginDTO.Email);

            if (data == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var isValid = BCrypt.Net.BCrypt.Verify(loginDTO.Password, data.Password);

            if (!isValid)   
            {
                return Unauthorized("Invalid email or password");
            }

            if (!data.IsActive)
            {
                return Unauthorized("Account is deactivated");
            }

            var token = tokenService.GenerateToken(data);

            return Ok(new AuthResponseDTO {
                Token = token,
                UserID = data.UserID,
                UserName = data.UserName,
                Role = data.Role.ToString()
            });
        }
    }
}
