using LibraryManagementSystem.Entities;
using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.DTO.UserDTO
{
    public class AddUserDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
 }
}
