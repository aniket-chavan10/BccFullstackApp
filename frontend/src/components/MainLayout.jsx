import React, { useRef } from 'react';
import Carousel from './Carousel';
import RecentFixture from './RecentFixture';

const MainLayout = () => {
  const carouselRef = useRef(null);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-stretch max-w-7xl mx-auto mt-24 w-full">
      <div className="lg:w-3/4 w-full flex-shrink-0" ref={carouselRef}>
        <Carousel />
      </div>
      <div className="lg:w-1/4 w-full lg:pl-6 mt-4 lg:mt-0 flex-shrink-0">
        <RecentFixture />
      </div>
    </div>
  );
};

export default MainLayout;
