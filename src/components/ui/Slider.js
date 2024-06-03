// src/components/Slider.js
import React from 'react';
import Slider from 'react-slick';
import './Slider.css';

const slides = [
  { id: 1, title: "Slide 1", description: "Description for Slide 1" },
  { id: 2, title: "Slide 2", description: "Description for Slide 2" },
  { id: 3, title: "Slide 3", description: "Description for Slide 3" },
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
          <div key={slide.id} className="p-4 bg-[#be2423] text-white">
            <h2 className="text-3xl font-bold">{slide.title}</h2>
            <p className="mt-2">{slide.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
