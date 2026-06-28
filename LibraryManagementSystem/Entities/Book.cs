using Microsoft.AspNetCore.Mvc.TagHelpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LibraryManagementSystem.Entities
{
    public enum Genre
    {
        Fiction,
        NonFiction,
        Mystery,
        ScienceFiction,
        Fantasy,
        Biography,
        History,
        Romance,
        Thriller,
        SelfHelp
    }
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        [Required]
        public string BookTitle { get; set; }
        [Required]
        public int AuthorID { get; set; }
        [Required]
        public string PublisherName { get; set; }
        public int PublishedYear { get; set; }

        public Genre Genre { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableBooks { get; set; }

        [ForeignKey("AuthorID")]
        public Author Author { get; set; }

        public ICollection<BorrowRecord> BorrowRecords { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
    }
}
