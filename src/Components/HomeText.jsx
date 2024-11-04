import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeText() {
    const navigate = useNavigate();
  return (
    <article className="container mx-auto h-72 flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
      <div className="flex flex-col gap-4 text-base lg:text-5xl my-2">
        <h6 className="font-bold text-lg lg:text-4xl text-black text-justify my-2">
          Book Local Beauty and
          <br />
          Wellness Services
        </h6>
        <h1 className="my-2 lg:my-4 text-justify text-gray-600">
          Find Better Places,
          <br />
          and Wonder...
        </h1>
      </div>
      {/* Call to Action Button */}
      <div className="flex flex-col items-center">
        <p className="text-sm lg:text-lg text-gray-700 mb-4">
          Ready to discover your next favorite beauty spot?
        </p>
        <button
          className="bg-blue-500 text-white font-semibold text-xs py-2 px-2 rounded-lg transition-transform transform hover:scale-105"
          onClick={() => navigate('/allstores')}
        >
          Explore Now
        </button>
      </div>
    </article>
  );
}

export default HomeText;
