import { useNavigate, useParams } from "react-router-dom";
import { deleteAuthor } from "../../Services/AuthorService";
import { useState } from "react";

export default function DeleteAuthor(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async ()=>{
        setLoading(true);
        setError(null);
        
        try{
            await(deleteAuthor(id));
            navigate("/authors");
        }
        catch(err){
            setError("Error" + err)
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    };

  const handleCancel = () => {
    navigate("/authors");
  };

    return(
        <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2>Are you sure you want to delete this Author?</h2>
      <p className="text-muted">This action cannot be undone.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-danger me-2" onClick={handleDelete} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
      <button className="btn btn-outline-secondary" onClick={handleCancel} disabled={loading}>
        Cancel
      </button>
    </div>
    );
}