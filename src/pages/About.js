// src/components/About.js
import React from 'react';
import logo from '../assets/images/logo.jpg'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold text-center text-[#be2423] mb-6">About the Yemeni Students Union in Turkey</h1>
        <div className="flex justify-center mb-8">
          <img
            src={logo} // Replace with the actual path to your title image
            alt="Yemeni Students Union in Turkey"
            className="rounded shadow-md"
          />
        </div>
        <section className="mb-8">
          <p className="text-gray-700 mb-4">
            The Yemeni Students Union in Turkey is a student organization established on February 28, 2016, with the aim of representing Yemeni students in Turkey, promoting their interests, and defending their rights. The Union serves as an important platform for communication and cooperation among Yemeni students in Turkey, enhancing cultural and social ties among students and providing support in various fields.
          </p>
          <p className="text-gray-700">
            The Yemeni Students Union in Turkey is distributed across 39 cities with branches and representations, and the Union seeks to be present and spread in all cities where Yemeni students are located.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
