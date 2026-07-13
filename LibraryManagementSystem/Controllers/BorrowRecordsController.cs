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

        [HttpGet("myBorrowRecords")]
        [Authorize(Roles = "Member")]
        public IActionResult GetMyBorrowRecords()
        {
            var userID = GetLoggedInUserId();

            var data = applicationDBContext.BorrowRecords
                .Include(a => a.Book)
                .Include(a => a.User)
                .Include(a => a.FinePenalty)
                .Where(a => a.UserID == userID)
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
                }).ToList();

            return Ok(data);
        }
        

        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
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
        [Authorize(Roles = "Member")]
        public IActionResult AddBorrowerRecords(AddBorrowRecordDTO addBorrowRecordDTO)
        {
            var loggedInUser = GetLoggedInUserId();

            var hasUnpaidFines = applicationDBContext.FinePenalties
                                    .Any(f => f.UserID == loggedInUser 
                                        && !f.IsPaid);

            if (hasUnpaidFines)
            {
                return BadRequest("You have unpaid fines. Please clear them before borrowing.");
            }

            var bookData = applicationDBContext.Books.Find(addBorrowRecordDTO.BookID);

            if (bookData == null) {
                return NotFound("Book Not Found");
            }


            if (bookData.AvailableBooks <= 0)
            {
                return NotFound("Book Not Available");
            }

            var userBorrowCount = applicationDBContext.BorrowRecords.Count(a => loggedInUser == a.UserID && a.Status == BorrowStatus.Borrowed);
            if (userBorrowCount >= 3) {
                return BadRequest("You have already borrowed 3 or more than 3 books. Return them first.");
            }

            if (bookData.AvailableBooks == 1)
            {
                var firstInLine = applicationDBContext.Reservations
                                        .Where(a => a.BookID == addBorrowRecordDTO.BookID
                                            && a.Status == ReservationStatus.Pending)
                                        .OrderBy(a => a.ReservedAt)          
                                        .FirstOrDefault();

                if (firstInLine != null && firstInLine.UserID != loggedInUser)
                {
                    return BadRequest("This book is reserved by another member.");
                }
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


            var myReservation = applicationDBContext.Reservations
                                    .FirstOrDefault(r => r.BookID == addBorrowRecordDTO.BookID
                                    && r.UserID == loggedInUser
                                    && r.Status == ReservationStatus.Pending);
            
            if (myReservation != null)
            {
                myReservation.Status = ReservationStatus.Fulfilled;
            }
                

            applicationDBContext.BorrowRecords.Add(data);
            applicationDBContext.SaveChanges();

            return Ok("Borrower Record Added successfully");
        }

        [HttpPut]
        [Route("{id:int}")]
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
