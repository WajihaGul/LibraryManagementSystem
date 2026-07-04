using LibraryManagementSystem.Entities;
using System.Collections.Generic;

namespace LibraryManagementSystem.DTO.AuthorDTO
{
    public class AddAuthorDTO
    {
        public string AuthorName { get; set; }
        public string? AuthorBio { get; set; }

    }
}
