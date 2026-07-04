using LibraryManagementSystem.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.DTO.BookDTO
{
    public class ViewBookDTO
    {
        public int BookId { get; set; }
        public string BookTitle { get; set; }
        public int AuthorID { get; set; }
        public string AuthorName { get; set; }
        public string PublisherName { get; set; }
        public int PublishedYear { get; set; }
        public string Genre { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableBooks { get; set; }

    }
}
