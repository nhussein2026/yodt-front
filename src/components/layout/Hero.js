import { Link } from "react-router-dom";
import "./Hero.css";
export const Hero = () => {
  return (
    <section className="hero-section relative flex items-center justify-center text-white h-screen">
      <div className="overlay absolute inset-0"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold">Welcome to YODT</h1>
        <p className="mt-4 text-lg">
          Explore our new features and join our community to benefit from our
          services and activities.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/register"
            className="bg-white text-[#be2423] py-2 px-4 rounded hover:bg-[#ed4343] hover:text-white transition duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-[#eb4040] text-white py-2 px-4 rounded hover:bg-white hover:text-[#be2423] transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};
