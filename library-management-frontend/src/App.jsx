import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Footer from "./Components/Footer.jsx";
import Register from "./Components/Register.jsx";
import Books from "./Components/Books.jsx";
import BorrowedBooks from "./Components/BorrowedBooks.jsx";
import ReservedBooks from "./Components/ReservedBooks.jsx";
import Fines from "./Components/Fines.jsx";
import Authors from "./Components/Authors.jsx";
import Home from "./Components/Home.jsx";

function App() {
  return (
    
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<Books />} />
            <Route path="/borrow" element={<BorrowedBooks />} />
            <Route path="/reserve" element={<ReservedBooks />} />
            <Route path="/fines" element={<Fines />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
