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
    calculatedTotalPrice,
  } = location.state || {};
  const navigate = useNavigate();

  const handleCancelAppointment = () => {
    navigate("/appointments");
  };

  const handleReturnHome = () =>{
    navigate("/");
  }

  return (
    <article className="bg-gradient-to-r from-blue-100 to-purple-100">
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        <img
          src={store.images[0]}
          alt={store.storeName || "Store"}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div>
          <h2 className="text-2xl text-gray-600 font-bold">{store.storeName}</h2>
          <p className="text-lg font-bold text-green-500">Booking Status: Confirmed</p>
          <p className="text-gray-500 font-semibold">
            {selectedDate ? new Date(selectedDate).toLocaleDateString() : "No Date Selected"} at{" "}
            {selectedTime ? selectedTime.toLocaleTimeString() : "No Time Selected"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg"
            onClick={handleCancelAppointment}
          >
            Cancel Appointment
          </button>
          <button className="mt-4 mx-4 px-4 py-2 bg-gray-600 font-semibold text-white rounded-lg"  onClick={handleReturnHome}>Return Home</button>
        </div>
        <div>
          <h3 className="text-lg text-gray-500 font-semibold">Booking Overview</h3>
          <ul className="mt-2">
            {Array.isArray(selectedServices) &&
              selectedServices.map((service) => (
                <li key={service._id} className="flex justify-between font-semibold">
                  <span>{service.name}</span>
                  <span>{service.price}</span>
                </li>
              ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-lg text-gray-500 font-semibold">Total Price:</h3>
            <p className="mt-2 font-semibold">Rs. {calculatedTotalPrice || "0"}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-500 font-semibold">Payment Method:</h3>
            <p className="mt-2 font-semibold">{paymentMethod || "No payment method selected."}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-500 font-semibold">Booking Notes:</h3>
            <p className="mt-2 font-semibold">{bookingNotes || "No special requests."}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-lg text-gray-500 font-semibold">Coupon Applied:</h3>
            <p className="mt-2 font-semibold">{coupon || "No coupon applied."}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg text-gray-600 font-semibold">Cancellation Policy</h3>
          <p className="mt-2 font-semibold">You can cancel your appointment up to 2 hours in advance for a full refund.</p>
        </div>
      </div>
    </div>
    </article>
  );
};

export default ConfirmationPage;


