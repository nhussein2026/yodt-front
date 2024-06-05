import React from 'react';
import Slider from 'react-slick';
import './Slider.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from '../../assets/images/300 (1).jpg';
import image2 from '../../assets/images/700 (1).jpg';
import image3 from '../../assets/images/1.jpeg';

const slides = [
  { id: 1, title: "Slide 1", description: "Description for Slide 1", imageUrl: image1 },
  { id: 2, title: "Slide 2", description: "Description for Slide 2", imageUrl: image2 },
  { id: 3, title: "Slide 3", description: "Description for Slide 3", imageUrl: image3 },
];

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map(slide => (
          <div key={slide.id} className="slide">
            <img src={slide.imageUrl} alt={slide.title} className="slide-image" />
            <div className="slide-content">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
