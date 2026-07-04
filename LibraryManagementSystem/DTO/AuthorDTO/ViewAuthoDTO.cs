using LibraryManagementSystem.DTO.BookDTO;

namespace LibraryManagementSystem.DTO.AuthorDTO
{
    public class ViewAuthorDTO
    {
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string? AuthorBio { get; set; }
        public List<BookSummaryDTO> Books { get; set; } = new List<BookSummaryDTO>();
    }
}
