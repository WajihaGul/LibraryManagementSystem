import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 py-5">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address*
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password*
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Register
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
