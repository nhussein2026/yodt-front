import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="bg-[#be2423] text-white h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold">Welcome to YODT</h1>
      <p className="mt-4 text-lg">Explore our new features and join our community to benefit from our services and activities.</p>
      <div className="mt-8 space-x-4">
        <Link
          to="/register"
          className="bg-white text-[#be2423] py-2 px-4 rounded hover:bg-[#231f20] hover:text-white transition duration-300"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-[#231f20] text-white py-2 px-4 rounded hover:bg-white hover:text-[#231f20] transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  </section>
  );
};
