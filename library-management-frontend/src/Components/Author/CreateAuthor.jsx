import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../Services/AuthorService";

export default function CreateAuthor() {
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createAuthor({ authorName, authorBio });
      navigate("/authors"); // create hote hi wapas list pe bhej do
    } catch (err) {
      setError("Author create nahi ho saka. " + (err.response?.data || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add New Author</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="authorName" className="form-label">Name*</label>
          <input
            type="text"
            className="form-control"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="authorBio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="authorBio"
            rows="3"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark" disabled={loading}>
          {loading ? "Saving..." : "Save Author"}
        </button>
      </form>
    </div>
  );
}