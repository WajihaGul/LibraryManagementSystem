import { useState, useEffect } from "react";
import { getMyReservations } from "../../Services/ReservationService";

export default function ViewAllReservations() {
  const [reservation, setReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await getMyReservations();
        setReservation(response);
      } catch (err) {
        setError("Error " + err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>All Reserved Books</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Book</th>
            <th scope="col">Status</th>
            <th scope="col">Reserved At</th>
            <th scope="col">Expires At</th>
          </tr>
        </thead>
        <tbody>
          {
            reservation.length > 0 &&
            reservation.map((r) => (
              <tr key={r.reservationId}>
                <th scope="row">{r.reservationId}</th>
                <td>{r.userName}</td>
                <td>{r.bookTitle}</td>
                <td>{r.reservationStatus}</td>
                <td>
                  {r.reservedAt
                    ? new Date(r.reservedAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  {r.expiresAt
                    ? new Date(r.expiresAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
