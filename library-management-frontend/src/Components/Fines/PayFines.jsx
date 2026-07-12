import { payFine } from "../../Services/FineService";
import { useState } from "react";

export default function PayFines({fineID,onSuccess, onClose}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const finalizePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      await payFine(fineID);
      onSuccess()
    } catch (err) {
      setError("Error" + err);
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pay Fine</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <h5>Are you sure you want to pay fine for this user?</h5>
            <p className="text-muted">This action can't be undone.</p>
            {error && <div className="alert alert-danger py-2">{error}</div>}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={finalizePayment}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}