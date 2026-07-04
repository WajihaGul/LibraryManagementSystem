using LibraryManagementSystem.DTO.BookDTO;

namespace LibraryManagementSystem.DTO.AuthorDTO
{
    public class ViewAuthoDTO
    {
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string? AuthorBio { get; set; }
        public List<ViewBookDTO> Books { get; set; } = new List<ViewBookDTO>;
    }
}
