import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { Store, services } = location.state || {};

  const [selectedServices, setSelectedServices] = useState([]);

  //   // Function to add a service to the selected list
  //   const addService = (service) => {
  //     setSelectedServices((prevSelected) => [...prevSelected, service]);
  //   };

  // Function to add a service to the selected list
  const addService = (service) => {
    // Check if the service is already selected
    if (!selectedServices.some((s) => s._id === service._id)) {
      setSelectedServices((prevSelected) => [...prevSelected, service]);
    }
  };

  // Function to undo/remove a service from the selected list
  const undoService = (service) => {
    setSelectedServices((prevSelected) =>
      prevSelected.filter((s) => s._id !== service._id)
    );
  };

  // Calculate total price of selected services
  const totalPrice = selectedServices.reduce(
    (acc, service) => acc + service.price,
    0
  );

  // Navigate to the Select Date and Time page
  const handleContinue = () => {
    navigate("/schedule", {
      state: {
        selectedServices,
        store: Store,
        totalPrice,
      },
    });
  };
  return (
    <div className="grid grid-cols-10 gap-6 p-4 min-h-screen">
      {/* Left Container - Available Services */}
      {/* <div className="col-span-6">
        <h2 className="text-2xl font-bold mb-4">Available Services</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm">Price: ${service.price}</p>
                <p className="text-sm">Duration: {service.duration}</p>
                <button className="btn btn-primary mt-2" onClick={() => addService(service)}>Add Service</button>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div> */}

      <div className="col-span-6">
        <h2 className="text-2xl font-bold mb-4">Available Services</h2>

        <div className="grid grid-cols-1 gap-4">
          {services && services.length > 0 ? (
            services.map((service) => {
              const isSelected = selectedServices.some(
                (s) => s._id === service._id
              );
              return (
                <div
                  key={service._id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm">Price: ${service.price}</p>
                  <p className="text-sm">Duration: {service.duration}</p>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() =>
                      isSelected ? undoService(service) : addService(service)
                    }
                  >
                    {isSelected ? "Undo" : "Add Service"}
                  </button>
                </div>
              );
            })
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div>

      {/* Right Container - Selected Services and Total */}
      <div className="col-span-4 bg-gray-100 shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-2">
          {Store?.storeName || "Store Name"}
        </h2>
        <p className="text-md mb-4">{Store?.location || "Store Location"}</p>

        <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>

        <div className="space-y-2">
          {selectedServices.length > 0 ? (
            selectedServices.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{service.name}</span>
                <span>${service.price}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No services selected.</p>
          )}
        </div>

        {/* Total Price */}
        <div className="border-t mt-4 pt-2 flex justify-between items-center font-bold">
          <span>Total Price:</span>
          <span>${totalPrice}</span>
        </div>

        {/* Continue Button */}
        <button
          className="btn btn-primary mt-4 w-full"
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
        >
          <span className="text-gray-600">Continue</span>
        </button>
      </div>
    </div>
  );
};

export default ServicePage;
