namespace LibraryManagementSystem.DTO.BookDTO
{
    public class BookSummaryDTO
    {
        public int BookId { get; set; }
        public string BookTitle { get; set; } = string.Empty;
        
        public string PublisherName { get; set; } = string.Empty;
        public int PublishedYear { get; set; }
        public string Genre { get; set; } = string.Empty;
        public int TotalCopies { get; set; }
        public int AvailableBooks { get; set; }
    }
}
