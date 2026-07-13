import { getAllBorrowRecords } from "../../Services/BorrowRecordsService";
import { useState, useEffect } from "react";

export default function ViewAllBorrowedBooks() {
  const [borrowRecord, setBorrowRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await getAllBorrowRecords();
      setBorrowRecord(response);
    } catch (err) {
      setError("Failed to load borrowed books. " + (err.response?.data || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
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

  const statusColor = (status) => {
    switch (status) {
      case "Returned":
        return "bg-success";
      case "Overdue":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Borrowed Books</h1>
        <span className="badge bg-dark fs-6">
          {borrowRecord.length} Record{borrowRecord.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Book</th>
              <th scope="col">Status</th>
              <th scope="col">Borrowed On</th>
              <th scope="col">Due Date</th>
              <th scope="col">Returned On</th>
            </tr>
          </thead>
          <tbody>
            {borrowRecord.length > 0 ? (
              borrowRecord.map((b) => (
                <tr key={b.borrowID}>
                  <th scope="row">{b.borrowID}</th>
                  <td>{b.userName}</td>
                  <td>{b.bookTitle}</td>
                  <td>
                    <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                  </td>
                  <td className="text-muted">
                    {b.borrowedAt ? new Date(b.borrowedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="text-muted">
                    {b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="text-muted">
                    {b.returnedAt ? new Date(b.returnedAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No borrow records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}