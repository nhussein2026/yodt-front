import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import PageLayout from "./components/layout/LayoutPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Volunteering from "./pages/Volunteering";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/volunteering" element={<Volunteering />} />

          <Route path="/*" element={<PageLayout><NotFound /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
