import React from 'react';
import { useLocation } from 'react-router-dom';

const getPageHeading = (pathname) => {
  switch (pathname) {
    case '/about':
      return 'About';
    case '/researchers':
      return 'Researchers';
    case '/scholar/:id':
      return 'Scholar Details';
    default:
      return 'Page Not Found';
  }
};

const PageLayout = ({ children }) => {
  const location = useLocation();
  const heading = getPageHeading(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold">{heading}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
