import React from "react";

function Footer() {
  return (
    <footer className="container mx-auto mt-16 pb-2">
      <div className="flex flex-wrap justify-evenly items-center mt-12 mb-8 gap-y-8">
        <div className="w-full md:w-1/2 lg:w-1/4">
          <div className="flex flex-col items-center gap-4 text-gray-600 font-medium text-xl">
            <h1 className="text-black font-bold text-2xl">Company</h1>
            <span>About</span>
            <span>Careers</span>
            <span>Mobile</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <div className="flex flex-col items-center gap-4 text-gray-600 font-medium text-xl">
            <h1 className="text-black font-bold text-2xl">Contact</h1>
            <span>Help/FAQ</span>
            <span>Press</span>
            <span>Affiliates</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4">
          <div className="flex flex-col items-center gap-4 text-gray-600 font-medium text-xl">
            <h1 className="text-black font-bold text-2xl">More</h1>
            <span>Airlinefees</span>
            <span>Airline</span>
            <span>Low fare tips</span>
          </div>
        </div>
      </div>
      <div className="text-gray-600 font-medium text-lg mb-12 text-center">
        All rights reserved @ Book My Barber
      </div>
    </footer>
  );
}

export default Footer;
