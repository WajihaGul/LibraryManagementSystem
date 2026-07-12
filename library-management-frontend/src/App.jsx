import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Login from "./Components/Login.jsx";
import Footer from "./Components/Footer.jsx";
import Register from "./Components/Register.jsx";
import Books from "./Components/Books.jsx";
import BorrowedBooks from "./Components/BorrowedBooks.jsx";
import ReservedBooks from "./Components/ReservedBooks.jsx";
import ViewMyFines from "./Components/Fines/ViewMyFine.jsx";
import ViewAllFines from "./Components/Fines/ViewAllFines.jsx";
import PayFines from "./Components/Fines/PayFines.jsx";
import Home from "./Components/Home.jsx";
import ViewAuthors from "./Components/Author/ViewAuthors.jsx";
import CreateAuthor from "./Components/Author/CreateAuthor.jsx";
import ViewBooksPerAuthor from "./Components/Author/ViewBooksPerAuthor.jsx";
import EditAuthor from "./Components/Author/EditAuthor.jsx";
import DeleteAuthor from "./Components/Author/DeleteAuthor.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/authors" element={<ViewAuthors />} />
            <Route path="/createAuthor" element={<CreateAuthor />} />
            <Route path="/authorBooks/:id" element={<ViewBooksPerAuthor />} />
            <Route path="/editAuthor/:id" element={<EditAuthor />} />
            <Route path="/deleteAuthor/:id" element={<DeleteAuthor />} />

            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<Books />} />
            <Route path="/borrow" element={<BorrowedBooks />} />
            <Route path="/reserve" element={<ReservedBooks />} />

            <Route path="/allFines" element={<ViewAllFines/>} />
            <Route path="/myFines" element={<ViewMyFines />} />
            <Route path="/payFine/:id" element={<PayFines />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
