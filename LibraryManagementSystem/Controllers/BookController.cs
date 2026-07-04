using LibraryManagementSystem.Data;
using LibraryManagementSystem.DTO;
using LibraryManagementSystem.DTO.AuthorDTO;
using LibraryManagementSystem.DTO.BookDTO;
using LibraryManagementSystem.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDBContext applicationDBContext;
        public BookController(ApplicationDBContext applicationDBContext)
        {
            this.applicationDBContext = applicationDBContext;
        }

        [HttpGet]
        public IActionResult getAllBooks()
        {

           var data = applicationDBContext.Books.Include(b=> b.Author)
                                .Select(b => new ViewBookDTO
                                    {
                                        BookId = b.BookId,
                                        BookTitle = b.BookTitle,
                                        Genre = b.Genre,
                                        PublishedYear = b.PublishedYear,
                                        PublisherName = b.PublisherName,
                                        AvailableBooks = b.AvailableBooks,
                                        TotalCopies = b.TotalCopies,
                                        AuthorID = b.AuthorID,
                                        AuthorName = b.Author.AuthorName
                                }).ToList();

            return Ok(data);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult getBooksByID(int id)
        {
            var getData = applicationDBContext.Books.
                Include(a => a.Author).
                Where(a => a.BookId == id).
                Select(a => new ViewBookDTO
                {
                    BookId = a.BookId,
                    BookTitle = a.BookTitle,
                    Genre = a.Genre,
                    PublishedYear = a.PublishedYear,
                    PublisherName = a.PublisherName,
                    AvailableBooks = a.AvailableBooks,
                    TotalCopies = a.TotalCopies,
                    AuthorID = a.AuthorID,
                    AuthorName = a.Author.AuthorName
                }).FirstOrDefault();
                
            if (getData == null)
            {
                return NotFound();
            }
            return Ok(getData);
        }

        [HttpPost]
        [Authorize(Roles = "Librarian")]
        public IActionResult createBook(AddBookDTO addBookDTO)
        {

            var data = new Book()
            {
                BookTitle = addBookDTO.BookTitle,
                TotalCopies = addBookDTO.TotalCopies,
                AvailableBooks = addBookDTO.AvailableBooks,
                Genre = addBookDTO.Genre,
                PublisherName = addBookDTO.PublisherName,
                PublishedYear = addBookDTO.PublishedYear,
                AuthorID = addBookDTO.AuthorID
            };
            applicationDBContext.Books.Add(data);
            applicationDBContext.SaveChanges();
            return Ok("New Book added successfully");
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult UpdateBook(int id, AddBookDTO addBookDTO)
        {
            var data = applicationDBContext.Books.Find(id);
            if (data == null)
            {
                return NotFound();
            }

            data.BookTitle = addBookDTO.BookTitle;
            data.TotalCopies = addBookDTO.TotalCopies;
            data.AvailableBooks = addBookDTO.AvailableBooks;
            data.Genre = addBookDTO.Genre;
            data.PublisherName = addBookDTO.PublisherName;
            data.PublishedYear = addBookDTO.PublishedYear;
            data.AuthorID = addBookDTO.AuthorID;

            applicationDBContext.SaveChanges();
            return Ok("Book updated successfully");
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Librarian")]
        public IActionResult DeleteBook(int id)
        {
            var data = applicationDBContext.Books.Find(id);
            if (data == null)
            {
                return NotFound("Data not found");
            }
            applicationDBContext.Books.Remove(data);
            applicationDBContext.SaveChanges();
            return Ok("Book deleted successfully");

        }
    }
}
