// import ScholarList from '../features/scholar/ScholarList';

import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import { Hero } from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import SliderComponent from "../components/ui/Slider";

export const Home = () => {
  return (
    <div className="homepage">
      <Hero />
      <div className="mt-16">
        <SliderComponent />
      </div>
      <Content />
      <Footer />
    </div>
  );
};
