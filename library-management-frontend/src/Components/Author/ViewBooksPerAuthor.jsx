import { getAuthorsByID } from "../../Services/AuthorService";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ViewBooksPerAuthor() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAuthorBooks = async () => {
      try {
        const response = await getAuthorsByID(id);
        setAuthor(response);
      } catch (err) {
        setError("error" + err);
      } finally {
        setLoading(false);
      }
    };
    getAuthorBooks();
  }, [id]);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );

  if (!author)
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Author not found</div>
      </div>
    );

  return (
    <div className="container py-4">
      <Link to="/authors" className="btn btn-outline-secondary btn-sm mb-3">
        ← Back to Authors
      </Link>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="m-0">{author.authorName}</h1>
          <p className="text-muted mb-0">{author.authorBio || "No bio available"}</p>
        </div>
        <span className="badge bg-dark fs-6">
          {author.books ? author.books.length : 0} Book{author.books?.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Publisher</th>
              <th scope="col">Year</th>
              <th scope="col">Available Copies</th>
            </tr>
          </thead>
          <tbody>
            {author.books && author.books.length > 0 ? (
              author.books.map((a) => (
                <tr key={a.bookId}>
                  <th scope="row">{a.bookId}</th>
                  <td>{a.bookTitle}</td>
                  <td>
                    <span className="badge bg-secondary">{a.genre}</span>
                  </td>
                  <td>{a.publisherName}</td>
                  <td>{a.publishedYear}</td>
                  <td>
                    <span className={`badge ${a.availableBooks > 0 ? "bg-success" : "bg-danger"}`}>
                      {a.availableBooks}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No books found for this author
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}