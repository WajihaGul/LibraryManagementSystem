import { useState, useEffect } from "react";
import { updateAReservation, getReservationsByID } from "../../Services/ReservationService";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateAReservations() {
  const [userName, setUserName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [resStatus, setResStatus] = useState("");
  const [reservedAt, setReservedAt] = useState("");
  const [expiredAt, setExpiredAt] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await getReservationsByID(id);
        setUserName(response.userName);
        setBookTitle(response.bookTitle);
        setResStatus(response.reservationStatus);
        setExpiredAt(response.expiresAt);
        setReservedAt(response.reservedAt);
      } catch (err) {
        setError("Error " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  const updateBookingStatus = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAReservation(id, { status: resStatus });
      navigate("/viewAllReservations");
    } catch (err) {
      setError("Error " + err);
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Update Status of Reservation</h1>
      <form onSubmit={updateBookingStatus}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bookTitle" className="form-label">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            value={bookTitle}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reservedAt" className="form-label">Reserved At</label>
          <input
            type="text"
            id="reservedAt"
            value={reservedAt ? new Date(reservedAt).toLocaleDateString() : ""}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expiredAt" className="form-label">Expires At</label>
          <input
            type="text"
            id="expiredAt"
            value={expiredAt ? new Date(expiredAt).toLocaleDateString() : ""}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="statusSelect" className="form-label">Status</label>
          <select
            id="statusSelect"
            className="form-select"
            value={resStatus}
            onChange={(e) => setResStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Fulfilled">Fulfilled</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Submit"}
        </button>
      </form>
    </>
  );
}