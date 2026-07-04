using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.UserDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Librarian")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext applicationDBContext;

        public UserController(ApplicationDBContext applicationDBContext)
        {
            this.applicationDBContext = applicationDBContext;
        }


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var data = applicationDBContext.Users
                    .Select(a => new ViewUserDTO
                    {
                        UserID = a.UserID,
                        UserName = a.UserName,
                        Email = a.Email,
                        IsActive = a.IsActive,
                        Role = a.Role.ToString(),
                    }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetUsersByID(int id)
        {
            var data = applicationDBContext.Users.
                        Where(a => a.UserID == id).
                        Select(a => new ViewUserDTO
                        {
                            UserID = a.UserID,
                            UserName = a.UserName,
                            Email = a.Email,
                            IsActive = a.IsActive,
                            Role = a.Role.ToString()
                        }).FirstOrDefault();

            if (data == null)
            {
                return NotFound("User NOT Found");
            }


            return Ok(data);

        }

        [HttpPut("deactivate/{id:int}")]
        
        public IActionResult DeactivateUser(int id)
        {
            var data = applicationDBContext.Users.Find(id);

            if (data == null)
            {
                return NotFound("User NOT Found");
            }

            data.IsActive = false;

            applicationDBContext.SaveChanges();

            return Ok("User Deactivated");

        }

        [HttpPut("activate/{id:int}")]

        public IActionResult ActivateUser(int id)
        {
            var data = applicationDBContext.Users.Find(id);

            if (data == null)
            {
                return NotFound("User NOT Found");
            }

            data.IsActive = true;

            applicationDBContext.SaveChanges();

            return Ok("User Activated");

        }
    }
}