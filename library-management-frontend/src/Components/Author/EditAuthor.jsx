import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateAuthors, getAuthorsByID } from "../../Services/AuthorService";

export default function EditAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await getAuthorsByID(id);
        setAuthorName(response.authorName);
        setAuthorBio(response.authorBio || "");
      } catch (err) {
        setError("Error" + err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await updateAuthors(id, { authorName, authorBio });
      navigate("/authors");
    } catch (err) {
      setError("Error " + (err.response?.data || ""));
      setSaving(false);
    }
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="authorName" className="form-label">
            Author Name
          </label>
          <input
            required
            id="authorName"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="authorBio" className="form-label">
            Bio
          </label>
          <input
            id="authorBio"
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
