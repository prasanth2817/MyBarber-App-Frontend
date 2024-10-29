// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";

// const ReviewAndConfirm = () => {
//   const location = useLocation();
//   const {
//     store = {},
//     selectedServices = [],
//     selectedDate = null,
//     selectedTime = null,
//     selectedProfessional = null,
//   } = location.state || {};
//   const navigate = useNavigate();

//   const [coupon, setCoupon] = useState("");
//   const [bookingNotes, setBookingNotes] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handleApplyCoupon = () => {
//     toast.success("Coupon applied:", coupon);
//   };

//   const handleConfirmBooking = () => {
//     const bookingData = {
//       store,
//       selectedServices,
//       selectedDate,
//       selectedTime,
//       selectedProfessional,
//       paymentMethod,
//       coupon,
//       bookingNotes,
//     };
//     navigate("/confirmation", { state: bookingData });
//   };

//   const handlePaymentClick = () => {
//     setPaymentMethod((prevMethod) => (prevMethod === "payAtVenue" ? "" : "payAtVenue"));
//   };
  
//   return (
//     <div className="grid grid-cols-10 gap-6 p-4 min-h-screen">
//       {/* Left Container - Review and Confirm Options */}
//       <div className="col-span-6">
//         <h2 className="text-2xl font-bold mb-6">Review and Confirm</h2>

//         {/* Payment Method */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
//           <button
//         type="button"
//         className={`p-3 rounded-lg w-full ${
//           paymentMethod === "payAtVenue" ? "bg-blue-500 text-white" : "bg-gray-200"
//         }`}
//         onClick={handlePaymentClick}
//       >
//         Pay at Venue
//       </button>
//         </div>

//         {/* Discount Coupon */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Discount Coupon</h3>
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={coupon}
//               onChange={(e) => setCoupon(e.target.value)}
//               placeholder="Enter coupon code"
//               className="p-3 border rounded-lg w-full"
//             />
//             <button onClick={handleApplyCoupon} className="btn btn-primary">
//               Apply
//             </button>
//           </div>
//         </div>

//         {/* Booking Notes */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold mb-2">Booking Notes</h3>
//           <textarea
//             value={bookingNotes}
//             onChange={(e) => setBookingNotes(e.target.value)}
//             placeholder="Any special requests?"
//             className="p-3 border rounded-lg w-full h-24"
//           />
//         </div>
//       </div>

//       {/* Right Container - Booking Summary */}
//       <div className="col-span-4 bg-gray-100 shadow-lg rounded-lg p-4">
//         <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

//         {/* Store Details */}
//         <h3 className="text-lg font-semibold mb-2">
//           {store?.storeName || "Store Name"}
//         </h3>
//         <p className="text-md mb-4">{store?.location || "Store Location"}</p>

//         {/* Selected Date and Time */}
//         <div className="mb-4">
//           <h3 className="text-md font-semibold">Date:</h3>
//           <p>
//             {selectedDate
//               ? new Date(selectedDate).toLocaleDateString()
//               : "No Date Selected"}
//           </p>
//           <h3 className="text-md font-semibold mt-2">Time:</h3>
//           <p>{selectedTime.toLocaleTimeString() || "No Time Selected"}</p>
//         </div>

//         {/* Selected Services */}
//         <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>
//         <div className="space-y-2">
//           {Array.isArray(selectedServices) &&
//             selectedServices.map((service) => (
//               <div
//                 key={service._id}
//                 className="flex justify-between items-center border-b pb-2"
//               >
//                 <span>{service.name}</span>
//                 <span>${service.price}</span>
//               </div>
//             ))}
//         </div>

//         {/* Selected Professional */}
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">Professional:</h3>
//           <p>
//             {selectedProfessional
//               ? `${selectedProfessional.firstName} ${selectedProfessional.lastName}`
//               : "Any Professional"}
//           </p>
//         </div>
//         {/* Confirm Button */}
//         <button
//           onClick={handleConfirmBooking}
//           className="btn btn-success w-full mt-4"
//         >
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ReviewAndConfirm;

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

  const [coupon, setCoupon] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleApplyCoupon = () => {
    toast.success("Coupon applied: " + coupon);
  };

  const handleConfirmBooking = async () => {
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
      paymentMethod,
      coupon,
      bookingNotes,
    };

    try {
      const response = await AxiosService.post("/appointments/create", bookingData);

      if (response.status === 201) { // Check if appointment creation was successful
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
    setPaymentMethod((prevMethod) => (prevMethod === "payAtVenue" ? "" : "payAtVenue"));
  };

  return (
    <div className="grid grid-cols-10 gap-6 p-4 min-h-screen">
      {/* Left Container - Review and Confirm Options */}
      <div className="col-span-6">
        <h2 className="text-2xl font-bold mb-6">Review and Confirm</h2>

        {/* Payment Method */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <button
            type="button"
            className={`p-3 rounded-lg w-full ${paymentMethod === "payAtVenue" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={handlePaymentClick}
          >
            Pay at Venue
          </button>
        </div>

        {/* Discount Coupon */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Discount Coupon</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="p-3 border rounded-lg w-full"
            />
            <button onClick={handleApplyCoupon} className="btn btn-primary">
              Apply
            </button>
          </div>
        </div>

        {/* Booking Notes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Booking Notes</h3>
          <textarea
            value={bookingNotes}
            onChange={(e) => setBookingNotes(e.target.value)}
            placeholder="Any special requests?"
            className="p-3 border rounded-lg w-full h-24"
          />
        </div>
      </div>

      {/* Right Container - Booking Summary */}
      <div className="col-span-4 bg-gray-100 shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

        {/* Store Details */}
        <h3 className="text-lg font-semibold mb-2">
          {store?.storeName || "Store Name"}
        </h3>
        <p className="text-md mb-4">{store?.location || "Store Location"}</p>

        {/* Selected Date and Time */}
        <div className="mb-4">
          <h3 className="text-md font-semibold">Date:</h3>
          <p>
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString()
              : "No Date Selected"}
          </p>
          <h3 className="text-md font-semibold mt-2">Time:</h3>
          <p>{selectedTime?.toLocaleTimeString() || "No Time Selected"}</p>
        </div>

        {/* Selected Services */}
        <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>
        <div className="space-y-2">
          {Array.isArray(selectedServices) &&
            selectedServices.map((service) => (
              <div
                key={service._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{service.name}</span>
                <span>${service.price}</span>
              </div>
            ))}
        </div>

        {/* Selected Professional */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Professional:</h3>
          <p>
            {selectedProfessional
              ? `${selectedProfessional.firstName} ${selectedProfessional.lastName}`
              : "Any Professional"}
          </p>
        </div>
        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          className="btn btn-success w-full mt-4"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default ReviewAndConfirm;

