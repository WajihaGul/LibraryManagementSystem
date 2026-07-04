using LibraryManagementSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.DTO.UserDTO
{
    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
   }
}
