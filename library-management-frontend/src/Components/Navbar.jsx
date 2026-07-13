import { Link } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const isLibrarian = user?.role === "Librarian";

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Library Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/authors"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Authors
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Books
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to="/books"
                      className="dropdown-item text-decoration-none"
                    >
                      View Books
                    </Link>
                  </li>
                  <li>
                    {isLibrarian ? (
                    <Link
                      to="/allBorrowedRecords"
                      className="dropdown-item text-decoration-none"
                    >
                      Borrowed Books
                    </Link>
                    ):(
                      <Link
                      to="/myBorrowedRecords"
                      className="dropdown-item text-decoration-none"
                    >
                      Borrowed Books
                    </Link>
                    )}
                  </li>
                  <li>
                    {isLibrarian ? (
                      <Link
                        to="/viewAllReservations"
                        className="dropdown-item text-decoration-none"
                      >
                        Reservations
                      </Link>
                    ) : (
                      <Link
                        to="/myReservations"
                        className="dropdown-item text-decoration-none"
                      >
                        Reservations
                      </Link>
                    )}
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                {isLibrarian ? (
                  <Link
                    to="/allFines"
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Fines
                  </Link>
                ) : (
                  <Link
                    to="/myFines"
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    Fines
                  </Link>
                )}
              </li>

              {user ? (
                <li className="nav-item d-flex align-items-center">
                  <span className="nav-link text-light">
                    Hi, {user.userName}
                  </span>
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    Login
                  </Link>
                </li>
              )}
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
