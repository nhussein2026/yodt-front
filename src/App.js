import React from "react";
import { Routes, Route } from "react-router-dom";
import  Home  from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import  About  from "./pages/About";
import { NotFound } from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Volunteering from "./pages/Volunteering";
import Profile from "./pages/Profile";
import Services from "./pages/Service";
import TrackApplication from "./pages/TrackApplication";
import Notification from "./components/layout/Notification";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/track-application" element={<TrackApplication />} />
          <Route path="/notify" element={<Notification />} />


          <Route path="/*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
