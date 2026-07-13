import { getAllBooks } from "../../Services/BooksService";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/UseAuth";
import { bookAReservation } from "../../Services/ReservationService";
import { BorrowABook } from "../../Services/BorrowRecordsService";

export default function ViewAllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const isLibrarian = user?.role === "Librarian";

  const fetchAllBooks = async () => {
    try {
      const response = await getAllBooks();
      setBooks(response);
    } catch (err) {
      const message = err.response?.data;
      alert(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleReservation = async (id) => {
    try {
      await bookAReservation(id);
      fetchAllBooks();
      alert(
        "Book has been reserved successfully.For more details, Click Books / Reservations",
      );
    } catch (err) {
      const message = err.response?.data || "Something went wrong while reserving.";
      alert(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (id) => {
    try {
      await BorrowABook(id);
      fetchAllBooks();
      alert(
        "Book has been borrowed successfully.For more details, Click Books / BorrowedBooks",
      );
    } catch (err) {
      const message = err.response?.data || "Something went wrong while borrowing.";
      alert(message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Books</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Genre</th>
            <th scope="col">Publisher</th>
            <th scope="col">Edition</th>
            <th scope="col">Available Copies</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <th scope="row">{b.bookId}</th>
              <td>{b.bookTitle}</td>
              <td>{b.authorName}</td>
              <td>{b.genre}</td>
              <td>{b.publisherName}</td>
              <td>{b.publishedYear}</td>
              <td>{b.availableBooks}</td>

              {!isLibrarian &&
                (b.availableBooks > 0 ? (
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleBorrow(b.bookId)}
                    >
                      Borrow Book
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleReservation(b.bookId)}
                    >
                      Reserve Book
                    </button>
                  </td>
                ))}
              {isLibrarian && (
                <td>
                  <button className="btn btn-primary">Edit Book</button>
                </td>
              )}
              {isLibrarian && (
                <td>
                  <button className="btn btn-primary">Delete Book</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
