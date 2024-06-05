import { Hero } from "../components/layout/Hero";
import Content from "../components/layout/Content";
import SliderComponent from "../components/ui/Slider";
const UserHomePage = () => {
  return (
    <div>
      <Hero />
      <div className="mt-16">
        <SliderComponent />
      </div>
      <Content />
    </div>
  );
};
export default UserHomePage;
