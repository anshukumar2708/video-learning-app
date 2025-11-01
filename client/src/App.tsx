import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// import { isAuth } from "./utils/auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

const App: React.FC = () => {
  const isAuth = true;
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isAuth ? <Cart /> : <Navigate to="/login" />}
          />
          {/* <Route
            path="/checkout"
            element={isAuth() ? <Checkout /> : <Navigate to="/login" />}
          /> */}
          {/* <Route
            path="/my-courses"
            element={isAuth() ? <MyCourses /> : <Navigate to="/login" />}
          /> */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
