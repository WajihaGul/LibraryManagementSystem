using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDBContext applicationDBContext;
        public BookController(ApplicationDBContext applicationDBContext)
        {
            this.applicationDBContext = applicationDBContext;
        }

        [HttpGet]
        /*public IActionResult getAllBooks()
        {

           var data = applicationDBContext.Books.Include(b => b.BorrowRecords, c => c.Reservations).
                                    Select(b => new BookDTO
                                    {
                                        BookTitle = b.BookTitle,
                                        Genre = b.Genre,
                                        PublishedYear = b.PublishedYear,
                                        PublisherName = b.PublisherName,
                                        AvailableBooks = b.AvailableBooks,
                                        TotalCopies = b.TotalCopies,
                                        BorrowRecords = b.BorrowRecords.Select(
                                            c => new BorrowRecordDTO
                                            {
                                                BorrowedAt = c.BorrowedAt,
                                                DueDate = c.DueDate,
                                                ReturnedAt = c.ReturnedAt,
                                                Status = c.Status
                                            }
                                        ).ToList(),
                                        Reservations = b.Reservations.Select(
                                            r => new ReservationDTO
                                            {
                                                ExpiresAt = r.ExpiresAt,
                                                ReservedAt = r.ReservedAt,
                                                Status = r.Status
                                            }
                                        ).ToList()
                                    }).ToList();

            return Ok(data);
        }*/

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult getBooksByID(int id)
        {
            var getData = applicationDBContext.Books.Find(id);
            if (getData == null)
            {
                return NotFound();
            }
            return Ok(getData);
        }

        [HttpPost]
        public IActionResult createBook(AuthorDTO authorDTO)
        {
            var data = new Author()
            {
                AuthorBio = authorDTO.AuthorBio,
                AuthorName = authorDTO.AuthorName
            };
            applicationDBContext.Authors.Add(data);
            applicationDBContext.SaveChanges();
            return Ok(data);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateBook(int id, AuthorDTO authorDTO)
        {
            var data = applicationDBContext.Authors.Find(id);
            if (data == null)
            {
                return NotFound();
            }

            data.AuthorBio = authorDTO.AuthorBio;
            data.AuthorName = authorDTO.AuthorName;

            applicationDBContext.SaveChanges();
            return Ok(data);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteBook(int id)
        {
            var data = applicationDBContext.Books.Find(id);
            if (data == null)
            {
                return NotFound("Data not found");
            }
            applicationDBContext.Books.Remove(data);
            applicationDBContext.SaveChanges();
            return Ok(data);

        }
    }
}
