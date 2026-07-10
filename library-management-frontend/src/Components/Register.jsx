import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../Services/AuthService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerUser({ email, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed. " + (err.response?.data || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Login</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address*
              </label>
              <input
              required
                type="email"
                id = "email"
                value={email}
                className="form-control"
                aria-describedby="emailHelp"
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password*
              </label>
              <input
              required
              id = "password"
                type="password"
                value = {password}
                className="form-control"
              onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              {loading ? "Registering..." : "Register"}
            </button>

           <Link to="/login" className="btn btn-dark w-100">
              Cancel
            </Link>
          </form>
          
        </div>
      </div>
    </div>
  );
}
