import { getMyFine } from "../../Services/FineService";
import { useState, useEffect } from "react";

export default function ViewMyFines() {
  
  const [fine, setFine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFines = async () => {
      try {
        const response = await getMyFine();
        setFine(response);
      } catch (err) {
        setError("Error" + err);
      } finally {
        setLoading(false);
      }
    };
    getFines();
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
        <h1 className="m-0">Fine Penalties</h1>
        <span className="badge bg-dark fs-6">
          {fine.length} Record{fine.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Issued On</th>
              <th scope="col">Paid On</th>
            </tr>
          </thead>
          <tbody>
            {fine.length > 0 ? (
              fine.map((f) => (
                <tr key={f.finePenaltyId}>
                  <th scope="row">{f.finePenaltyId}</th>
                  <td>Rs. {f.fineAmount}</td>
                  <td>
                    <span className={`badge ${f.isPaid ? "bg-success" : "bg-danger"}`}>
                      {f.isPaid ? "Paid" : "Due"}
                    </span>
                  </td>
                  <td className="text-muted">
                    {f.issuedAt ? new Date(f.issuedAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="text-muted">
                    {f.paidAt ? new Date(f.paidAt).toLocaleDateString() : "—"}
                  </td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td  className="text-center text-muted py-4">
                  No fines found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}