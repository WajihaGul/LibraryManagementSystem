using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO.BookDTO;
using LibraryManagementSystem.DTO.BorrowRecordsDTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    
    public class BorrowRecordsController : LibraryUserController
    {
        private readonly ApplicationDBContext applicationDBContext;
        public BorrowRecordsController(ApplicationDBContext applicationDBContext) { 
            this.applicationDBContext = applicationDBContext;
        }

         
        [HttpGet]
        public IActionResult GetAllBorrowerRecords()
        {
            var data = applicationDBContext.BorrowRecords
                .Include(a=> a.Book)
                .Include(a=>a.User)
                .Include(a=>a.FinePenalty)
                .Select(a=>new ViewBorrowRecordDTO
                {
                    BorrowID = a.BorrowID,
                    BookID = a.BookID,
                    BookTitle = a.Book.BookTitle,
                    UserID = a.UserID,
                    UserName = a.User.UserName,
                    Status = a.Status,
                    BorrowedAt = a.BorrowedAt,
                    DueDate = a.DueDate,
                    ReturnedAt = a.ReturnedAt,
                    FinePenaltyAmount = a.FinePenalty != null ? a.FinePenalty.FineAmount : 0
                }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetAllBorrowerRecordsByID(int id)
        {
            var data = applicationDBContext.BorrowRecords
                .Include(a => a.Book)
                .Include(a => a.User)
                .Include(a => a.FinePenalty)
                .Where(a=>a.BorrowID == id)
                .Select(a => new ViewBorrowRecordDTO
                {
                    BorrowID = a.BorrowID,
                    BookID = a.BookID,
                    BookTitle = a.Book.BookTitle,
                    UserID = a.UserID,
                    UserName = a.User.UserName,
                    Status = a.Status,
                    BorrowedAt = a.BorrowedAt,
                    DueDate = a.DueDate,
                    ReturnedAt = a.ReturnedAt,
                    FinePenaltyAmount = a.FinePenalty != null ? a.FinePenalty.FineAmount : 0
                }).FirstOrDefault();

            if (data == null)
            {
                return NotFound();
            }
            return Ok(data);
        }

        [HttpPost]
        public IActionResult AddBorrowerRecords(AddBorrowRecordDTO addBorrowRecordDTO)
        {
            var bookData = applicationDBContext.Books.Find(addBorrowRecordDTO.BookID);

            if (bookData == null) {
                return NotFound("Book Not Found");
            }


            if (bookData.AvailableBooks <= 0)
            {
                return NotFound("Book Not Available");
            }

            var loggedInUser = GetLoggedInUserId();

            var userBorrowCount = applicationDBContext.BorrowRecords.Count(a => loggedInUser == a.UserID && a.Status == BorrowStatus.Borrowed);
            if (userBorrowCount >= 3) {
                return BadRequest("You have already borrowed 3 or more than 3 books. Return them first.");
            }

            var data = new BorrowRecord
            {
                BookID = addBorrowRecordDTO.BookID,
                UserID = GetLoggedInUserId(),
                BorrowedAt = DateTime.Now,
                DueDate = DateTime.Now.AddDays(14),
                Status = BorrowStatus.Borrowed
            };

            bookData.AvailableBooks--;

            applicationDBContext.BorrowRecords.Add(data);
            applicationDBContext.SaveChanges();

            return Ok("Borrower Record Added successfully");
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult UpdateBorrowerRecords(int id)
        {
            var data = applicationDBContext.BorrowRecords.Find(id);

            if (data == null)
            {
                return NotFound("Data Not Found");
            }

            if (data.Status == BorrowStatus.Returned) { 
                return BadRequest("This book was already returned");
            }

            data.ReturnedAt = DateTime.Now;
            data.Status = BorrowStatus.Returned;

            var book = applicationDBContext.Books.Find(data.BookID);
            
            if(book!= null)
            {
                book.AvailableBooks++;
            }
            
            applicationDBContext.SaveChanges();
            return Ok("Book returned successfully");
        }

    }
}
