import { getAllAuthors } from "../../Services/AuthorService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ViewAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAuthors = async () => {
      try {
        const response = await getAllAuthors();
        setAuthors(response);
      } catch (err) {
        setError("There is some issue in fetching authors" + err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllAuthors();
  }, []);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Authors</h1>
        
        <Link to="/createAuthor" className="btn btn-dark">+ Add Author</Link>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Bio</th>
              <th scope="col">Books</th>
              <th scope="col" className="text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.authorId}>
                <th scope="row">{a.authorId}</th>
                <td>{a.authorName}</td>
                <td className="text-muted">
                  {a.authorBio || <span className="fst-italic">No bio available</span>}
                </td>
                <td>
                  <span className="badge bg-secondary">
                    {a.books ? a.books.length : 0}
                  </span>
                </td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm">
                    View Books
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}