import { Link } from "react-router-dom";

export default function Footer() {
  const navy = "#1b2a4a";
  const accent = "#e0a458";

  return (
    <footer style={{ backgroundColor: navy }} className="text-light mt-auto">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-book me-2" style={{ color: accent }}></i>
              Library Management System
            </h5>
            <p className="text-light opacity-75 small mb-0">
              Manage books, borrowing, and reservations with ease. Your next
              great read is just a click away.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3" style={{ color: accent }}>
              Quick Links
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/books" className="text-light text-decoration-none opacity-75">
                  Books
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/authors" className="text-light text-decoration-none opacity-75">
                  Authors
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/fines" className="text-light text-decoration-none opacity-75">
                  Fines
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-light text-decoration-none opacity-75">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3" style={{ color: accent }}>
              Contact
            </h6>
            <ul className="list-unstyled text-light opacity-75 small">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2" style={{ color: accent }}></i>
                123 Library Street, Book City
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2" style={{ color: accent }}></i>
                support@library.com
              </li>
              <li>
                <i className="bi bi-telephone me-2" style={{ color: accent }}></i>
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
          <p className="small text-light opacity-75 mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className="text-light opacity-75 fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light opacity-75 fs-5">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="text-light opacity-75 fs-5">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}