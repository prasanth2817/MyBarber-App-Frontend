import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosService from "../Common/ApiServices";
import { useAuthContext } from "../Contexts/AuthContext";

const ReviewAndConfirm = () => {
  const location = useLocation();
  const { authUser } = useAuthContext();
  const {
    store = {},
    selectedServices = [],
    selectedDate = null,
    selectedTime = null,
    selectedProfessional = null,
  } = location.state || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Calculate total price from selected services
  const calculatedTotalPrice = selectedServices.reduce(
    (total, service) => total + (service.price || 0),
    0
  );

  const handleApplyCoupon = () => {
    toast.success("Coupon applied: " + coupon);
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    const bookingData = {
      userId: authUser.id,
      serviceIds: selectedServices.map((service) => service._id),
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      storeId: store._id,
    };

    const DataFetched = {
      store,
      selectedServices,
      selectedDate,
      selectedTime,
      selectedProfessional,
      calculatedTotalPrice,
      paymentMethod,
      coupon,
      bookingNotes,
    };

    try {
      const response = await AxiosService.post(
        "/appointments/create",
        bookingData
      );

      if (response.status === 201) {
        // Check if appointment creation was successful
        navigate("/confirmation", {
          state: { ...bookingData, status: "Confirmed", ...DataFetched },
        });
        toast.success("Booking confirmed!");
      } else {
        toast.error(response.data.message || "Failed to create booking.");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("An error occurred while confirming your booking.");
    }
  };

  const handlePaymentClick = () => {
    setPaymentMethod((prevMethod) =>
      prevMethod === "Pay At Venue" ? "" : "Pay At Venue"
    );
  };

  return (
    <article className="bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="grid grid-cols-10 gap-6 p-4 min-h-screen mx-12">
        {/* Left Container - Review and Confirm Options */}
        <div className="col-span-6">
          <h2 className="text-2xl text-purple-500 font-bold mb-6">
            Review and Confirm
          </h2>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg text-slate-600 font-semibold mb-2">
              Payment Method
            </h3>
            <div>
              <button
                type="button"
                className={`p-3 rounded-lg font-medium w-6/12 ${
                  paymentMethod === "Pay At Venue"
                    ? "bg-purple-400 text-white"
                    : "bg-slate-100"
                }`}
                onClick={handlePaymentClick}
              >
                Pay at Venue
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`p-3 rounded-lg font-medium w-6/12 bg-slate-100 mt-6`}
                disabled={"true"}
              >
                Other Options{" "}
                <span className="text-xs">(currently Unavailable)</span>
              </button>
            </div>
          </div>

          {/* Discount Coupon */}
          <div className="mb-6">
            <h3 className="text-lg text-slate-800 font-semibold mb-2">
              Discount Coupon
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="p-3 border bg-slate-100 rounded-lg w-6/12"
              />
              <button onClick={handleApplyCoupon} className="btn btn-primary">
                Apply
              </button>
            </div>
          </div>

          {/* Booking Notes */}
          <div className="mb-6">
            <h3 className="text-lg text-slate-800 font-semibold mb-2">
              Booking Notes :
            </h3>
            <textarea
              value={bookingNotes}
              onChange={(e) => setBookingNotes(e.target.value)}
              placeholder="Any special requests?"
              className="p-3 border bg-slate-100 rounded-lg w-9/12 h-24"
            />
          </div>
        </div>

        {/* Right Container - Booking Summary */}
        <div className="col-span-4 bg-gray-100 shadow-lg rounded-lg p-4">
          <h2 className="text-2xl text-blue-400 font-bold mb-4">
            Booking Summary
          </h2>

          {/* Store Details */}
          <h3 className="text-lg text-slate-600 font-bold mb-2">
            {store?.storeName || "Store Name"}
          </h3>
          <p className="text-md font-semibold mb-4">
            {store?.location || "Store Location"}
          </p>

          {/* Selected Date and Time */}
          <div className="mb-4">
            <h3 className="text-md text-slate-600 font-semibold">Date:</h3>
            <p className="font-semibold">
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString()
                : "No Date Selected"}
            </p>
            <h3 className="text-md text-slate-600 font-semibold mt-2">Time:</h3>
            <p className="font-semibold">
              {selectedTime?.toLocaleTimeString() || "No Time Selected"}
            </p>
          </div>

          {/* Selected Services */}
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            Selected Services:
          </h3>
          <div className="space-y-2">
            {Array.isArray(selectedServices) &&
              selectedServices.map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between items-center font-semibold border-b pb-2"
                >
                  <span>{service.name}</span>
                  <span>Rs.{service.price}</span>
                </div>
              ))}
          </div>

          {/* Selected Professional */}
          <div className="mt-4">
            <h3 className="text-lg text-slate-600 font-semibold">
              Professional:
            </h3>
            <p className="font-semibold">
              {selectedProfessional
                ? `${selectedProfessional.firstName} ${selectedProfessional.lastName}`
                : "Any Professional"}
            </p>
          </div>

          {/* Total Price */}
          <div className="border-t mt-4 pt-2 flex justify-between items-center font-bold">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-gray-600">Rs.{calculatedTotalPrice}</span>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirmBooking}
            disabled={loading || !paymentMethod}
            className={`btn btn-success w-full mt-6 ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="loading loading-spinner bg-purple-400 w-4 h-4 sm:w-8 sm:h-8"></span>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ReviewAndConfirm;
