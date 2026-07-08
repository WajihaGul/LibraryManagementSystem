import { Link } from "react-router-dom";

export default function Home() {
  const genres = [
    { name: "Fiction", icon: "bi-feather" },
    { name: "Science", icon: "bi-clipboard2-pulse" },
    { name: "History", icon: "bi-hourglass-split" },
    { name: "Biography", icon: "bi-person-lines-fill" },
    { name: "Fantasy", icon: "bi-stars" },
    { name: "Self-Help", icon: "bi-lightbulb" },
  ];

  const navy = "#1b2a4a";       // deep navy — primary dark section color
  const navySoft = "#22315a";   // slightly lighter navy for cards on navy bg
  const cream = "#f7f4ef";      // warm off-white instead of harsh white
  const accent = "#e0a458";     // warm gold/amber accent

  return (
    <>
      {/* Carousel */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        style={{ marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)" }}
      >
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80" className="d-block w-100" style={{ height: "650px", objectFit: "cover" }} alt="Library interior" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Welcome to the Library</h5>
              <p>Explore thousands of books anytime, anywhere.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80" className="d-block w-100" style={{ height: "650px", objectFit: "cover" }} alt="Bookshelves" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Browse Our Collection</h5>
              <p>Find your next favorite read among our curated shelves.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80" className="d-block w-100" style={{ height: "650px", objectFit: "cover" }} alt="Reading area" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Borrow, Reserve, Return</h5>
              <p>Manage your library activity with ease.</p>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: cream }} className="py-5 border-bottom">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <h2 className="fw-bold" style={{ color: navy }}>10,000+</h2>
              <p className="text-secondary mb-0">Books Available</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <h2 className="fw-bold" style={{ color: navy }}>500+</h2>
              <p className="text-secondary mb-0">Active Members</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold" style={{ color: navy }}>24/7</h2>
              <p className="text-secondary mb-0">Online Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ backgroundColor: navy }} className="text-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <i className="bi bi-book fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h5>Browse</h5>
              <p className="text-light opacity-75">
                Explore our full catalog of books by title, author, or genre.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-check-circle fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h5>Borrow or Reserve</h5>
              <p className="text-light opacity-75">
                Instantly borrow available books, or reserve ones that are checked out.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-arrow-repeat fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h5>Return with Ease</h5>
              <p className="text-light opacity-75">
                Track due dates and return books on time, right from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div style={{ backgroundColor: cream }} className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                className="img-fluid rounded shadow"
                alt="About the library"
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3" style={{ color: navy }}>About Us</h2>
              <p className="text-secondary">
                The Library Management System is built to make borrowing, reserving,
                and managing books simple for both readers and librarians. Our mission
                is to bring the joy of reading closer to everyone, backed by a modern,
                easy-to-use platform.
              </p>
              <p className="text-secondary mb-0">
                Whether you're searching for your next great read or managing a growing
                collection, we've got the tools to make it effortless.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Genres */}
      <div style={{ backgroundColor: navy }} className="text-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Popular Genres</h2>
          <div className="row text-center g-4">
            {genres.map((genre) => (
              <div className="col-6 col-md-2" key={genre.name}>
                <div
                  className="p-3 rounded h-100"
                  style={{ backgroundColor: navySoft }}
                >
                  <i className={`bi ${genre.icon} fs-2 mb-2 d-block`} style={{ color: accent }}></i>
                  <p className="mb-0 small">{genre.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ backgroundColor: cream }} className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: navy }}>What Our Members Say</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 rounded shadow-sm h-100 bg-white">
                <i className="bi bi-quote fs-2" style={{ color: accent }}></i>
                <p className="text-secondary">
                  "Reserving books online saved me so much time. I never miss out on
                  new releases anymore."
                </p>
                <h6 className="fw-bold mb-0" style={{ color: navy }}>— Sarah M.</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded shadow-sm h-100 bg-white">
                <i className="bi bi-quote fs-2" style={{ color: accent }}></i>
                <p className="text-secondary">
                  "The due date tracker is a lifesaver — no more forgetting to return
                  books and getting fined."
                </p>
                <h6 className="fw-bold mb-0" style={{ color: navy }}>— James K.</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded shadow-sm h-100 bg-white">
                <i className="bi bi-quote fs-2" style={{ color: accent }}></i>
                <p className="text-secondary">
                  "Such a clean and simple system. Managing my borrowed books has never
                  been easier."
                </p>
                <h6 className="fw-bold mb-0" style={{ color: navy }}>— Aisha R.</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div style={{ backgroundColor: navy }} className="text-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">Contact Us</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4 mb-md-0">
              <i className="bi bi-geo-alt fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h6 className="fw-bold">Address</h6>
              <p className="text-light opacity-75 mb-0">123 Library Street, Book City</p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <i className="bi bi-envelope fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h6 className="fw-bold">Email</h6>
              <p className="text-light opacity-75 mb-0">support@library.com</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-telephone fs-1 mb-3 d-block" style={{ color: accent }}></i>
              <h6 className="fw-bold">Phone</h6>
              <p className="text-light opacity-75 mb-0">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div style={{ backgroundColor: cream }} className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3" style={{ color: navy }}>Ready to get started?</h2>
          <p className="text-secondary mb-4">
            Join the library today and start borrowing your favorite books.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/books"
              className="btn btn-lg text-white"
              style={{ backgroundColor: navy, borderColor: navy }}
            >
              Browse Books
            </Link>
            <Link
              to="/login"
              className="btn btn-outline-secondary btn-lg"
              style={{ borderColor: navy, color: navy }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}