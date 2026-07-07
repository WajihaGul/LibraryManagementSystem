export default function Footer() {
  return (
    <footer className="text-light bg-dark text-center text-lg-start mt-auto">
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-4 mb-2 mb-md-0">
            <h6 className="fw-bold">Library Management System</h6>
            <p className="small mb-0">
              Manage books, borrowing, and reservations with ease.
            </p>
          </div>

          <div className="col-md-4 mb-2 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/books" className="text-decoration-none">
                  Books
                </a>
              </li>
              <li>
                <a href="/authors" className="text-decoration-none">
                  Authors
                </a>
              </li>
              <li>
                <a href="/login" className="text-decoration-none">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Contact</h6>
            <p className="small text-muted mb-0">support@library.com</p>
          </div>
        </div>

        <hr />

        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}