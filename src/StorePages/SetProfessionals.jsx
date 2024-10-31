import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SelectProfessional = () => {
  const location = useLocation();
  const { store, selectedDate, selectedTime, selectedServices } = location.state || {};
  const navigate = useNavigate();
  
  // State to keep track of the selected professional
  const [selectedProfessional, setSelectedProfessional] = useState({ firstName: 'Any ', lastName:'Professional', id: 'any' });

  const handleProfessionalSelect = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    navigate('/reviewandconfirm', {
      state: {
        store,
        selectedDate,
        selectedTime,
        selectedServices,
        selectedProfessional,
      },
    });
  };

  return (
    <div className="mt-0 pt-0 p-4 bg-gradient-to-r from-blue-100 to-purple-100">
    <div className="grid grid-cols-10 gap-6 p-4 min-h-screen">
      
    {/* Left Container - Select Professional */}
<div className="col-span-6">
  <h2 className="text-2xl font-bold text-purple-500 mb-6">Select Professional</h2>

  {/* Default "Any Professional" option with icon */}
  <button
    className={`flex items-center p-3 mb-4 rounded-lg w-full ${
      selectedProfessional.id === 'any' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 font-semibold'
    }`}
    onClick={() => handleProfessionalSelect({ firstName: 'Any', lastName: 'Professional', id: 'any' })}
  >
    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
      {/* Placeholder icon, you could replace this with an <img> if profile images are available */}
      <span className="text-lg font-bold text-gray-700">A</span>
    </div>
    <span className='text-lg'>Any Professional (for best availability)</span>
  </button>

  {/* List of available professionals */}
  <div className="grid grid-cols-1 gap-4">
    {store.teamMembers.map((professional) => (
      <button
        key={professional._id}
        className={`flex items-center p-3 rounded-lg w-full ${
          selectedProfessional._id === professional._id ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 font-semibold'
        }`}
        onClick={() => handleProfessionalSelect(professional)}
      >
        {/* Circular icon for each professional */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          {/* Initials as a placeholder icon, or replace with <img src={professional.imageUrl} /> if you have images */}
          <span className="text-lg font-bold text-gray-700">
            {professional.firstName[0]}{professional.lastName[0]}
          </span>
        </div>
        <span className='text-lg'>{professional.firstName} {professional.lastName}</span>
      </button>
    ))}
  </div>
</div>


      {/* Right Container - Selected Store, Date, Time, Services, and Professional */}
      <div className="col-span-4 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl text-purple-500 font-bold mb-2">{store?.storeName || 'Store Name'}</h2>
        <p className="text-md font-semibold mb-2">Location: {store?.location || 'Store Location'}</p>
        
        <h3 className="text-lg text-gray-500 font-semibold">Selected Date & Time:</h3>
        <p className="mb-4 font-semibold">{selectedDate.toDateString()} at {selectedTime.toLocaleTimeString()}</p>
        
        <h3 className="text-lg text-gray-500 font-semibold mb-2">Selected Services:</h3>
        <ul className="mb-4 space-y-1">
          {selectedServices.map((service,index) => (
            <div
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-semibold">{service.name}</span>
            <span className="font-semibold">Rs.{service.price}</span>
          </div>
          ))}
        </ul>

        <h3 className="text-lg text-gray-500 font-semibold mb-2">Selected Professional:</h3>
        <p>{selectedProfessional.firstName} {selectedProfessional.lastName}</p>
        
        {/* Continue button to navigate to Review & Confirm page */}
        <button
          className="btn btn-primary mt-6 w-full"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default SelectProfessional;
