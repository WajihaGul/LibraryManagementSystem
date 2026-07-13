import { useState, useEffect } from "react";
import { getAllReservations } from "../../Services/ReservationService";
import { Link } from "react-router-dom";

export default function ViewAllReservations() {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await getAllReservations();
        setReservation(response);
      } catch (err) {
        setError("Error " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBookings();
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
      case "Fulfilled":
        return "bg-success";
      case "Cancelled":
        return "bg-secondary";
      case "Expired":
        return "bg-danger";
      default:
        return "bg-warning text-dark";
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">All Reserved Books</h1>
        <span className="badge bg-dark fs-6">
          {reservation.length} Record{reservation.length === 1 ? "" : "s"}
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
              <th scope="col">Reserved On</th>
              <th scope="col">Expires On</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservation.length > 0 ? (
              reservation.map((r) => (
                <tr key={r.reservationId}>
                  <th scope="row">{r.reservationId}</th>
                  <td>{r.userName}</td>
                  <td>{r.bookTitle}</td>
                  <td>
                    <span className={`badge ${statusColor(r.reservationStatus)}`}>
                      {r.reservationStatus}
                    </span>
                  </td>
                  <td className="text-muted">
                    {r.reservedAt ? new Date(r.reservedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="text-muted">
                    {r.expiresAt ? new Date(r.expiresAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/updateReservation/${r.reservationId}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Update Status
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No reservations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}