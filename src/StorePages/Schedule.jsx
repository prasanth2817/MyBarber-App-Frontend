import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Schedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, selectedServices = [], totalPrice } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Generate dates for the next 7 days
  const getNextSevenDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  // Generate time slots based on store opening and closing times
  useEffect(() => {
    if (store?.openTime && store?.closeTime) {
      const times = [];
      const start = new Date(`1970-01-01T${store.openTime}`);
      const end = new Date(`1970-01-01T${store.closeTime}`);
      while (start <= end) {
        times.push(new Date(start));
        start.setMinutes(start.getMinutes() + 30);
      }
      setAvailableTimes(times);
    }
  }, [store]);

  const handleContinue = () => {
    navigate("/setprofessionals", {
      state: {
        store,
        selectedServices,
        totalPrice,
        selectedDate,
        selectedTime,
      },
    });
  };

  return (
    <div className="mt-0 pt-0 p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="grid grid-cols-10 gap-6 p-4 min-h-screen">
        {/* Left Container - Date and Time Selection */}
        <div className="col-span-12 lg:col-span-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-500">
            Select Date and Time
          </h2>

          {/* Date Selection */}
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {getNextSevenDays().map((date) => {
              const dateString = date.toDateString();
              return (
                <button
                  key={dateString}
                  className={`p-2.5 lg:p-2 rounded-lg text-sm ${
                    selectedDate?.toDateString() === dateString
                      ? "bg-blue-500 text-white"
                      : "bg-white text-slate-500 font-semibold"
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              );
            })}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {availableTimes.map((time) => {
              if (!selectedDate) return null;

              // Determine if the selected time is in the past for today's date
              const selectedDateTime = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                time.getHours(),
                time.getMinutes()
              );

              const currentTime = new Date();
              const isPastTime =
                selectedDate.toDateString() === currentTime.toDateString() &&
                selectedDateTime < currentTime;

              return (
                <button
                  key={time}
                  className={`p-2 rounded-lg text-sm ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-white text-slate-500 font-semibold"
                  } ${isPastTime ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isPastTime}
                  onClick={() => setSelectedTime(time)}
                >
                  {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Container - Store and Appointment Summary */}
        <div className="col-span-12 lg:col-span-4 bg-gray-100 shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-2 text-purple-500">
            {store?.storeName || "Store Name"}
          </h2>
          <p className="text-md mb-2">{store?.location || "Store Location"}</p>

          {/* Selected Date and Time */}
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Selected Date and Time:
          </h3>
          <p className="mb-4">
            {selectedDate
              ? `${selectedDate.toLocaleDateString()} at ${
                  selectedTime
                    ? selectedTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "No time selected"
                }`
              : "No date selected"}
          </p>

          {/* Selected Services */}
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Selected Services:
          </h3>
          <div className="space-y-2">
            {selectedServices.length > 0 ? (
              selectedServices.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>{service.name}</span>
                  <span>Rs.{service.price}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No services selected.</p>
            )}
          </div>

          {/* Total Price */}
          <div className="border-t text-gray-600 mt-4 pt-2 flex justify-between items-center font-bold">
            <span>Total Price:</span>
            <span>Rs.{totalPrice}</span>
          </div>

          {/* Continue Button */}
          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

