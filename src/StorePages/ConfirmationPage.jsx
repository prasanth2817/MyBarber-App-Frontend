import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const {
    store = {},
    selectedServices = [],
    selectedDate = null,
    selectedTime = null,
    bookingNotes,
    coupon,
    paymentMethod,
  } = location.state || {};
  const navigate = useNavigate();

  const handleCancelAppointment = () => {
    // Logic to cancel the appointment
    console.log("Appointment canceled");
    navigate("/"); // Redirect to homepage or previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        <img
          src={store.images[0]} // Replace with actual store image URL
          alt={store.storeName || "Store"}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div>
          <h2 className="text-xl font-semibold">{store.storeName}</h2>
          <p className="text-lg font-bold text-green-500">Booking Status: Confirmed</p>
          <p className="text-gray-600">
            {selectedDate ? new Date(selectedDate).toLocaleDateString() : "No Date Selected"} at{" "}
            {selectedTime ? selectedTime.toLocaleTimeString() : "No Time Selected"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={handleCancelAppointment}
          >
            Cancel Appointment
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Booking Overview</h3>
          <ul className="mt-2">
            {Array.isArray(selectedServices) &&
              selectedServices.map((service) => (
                <li key={service._id} className="flex justify-between">
                  <span>{service.name}</span>
                  <span>{service.price}</span>
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Booking Notes:</h3>
            <p className="mt-2 text-gray-600">{bookingNotes || "No special requests."}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Coupon Applied:</h3>
            <p className="mt-2 text-gray-600">{coupon || "No coupon applied."}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Cancellation Policy</h3>
          <p className="mt-2 text-gray-600">You can cancel your appointment up to 2 hours in advance for a full refund.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;


