import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosService from "../Common/ApiServices";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const userId = authUser.id;
  const sortedAppointment = [...appointments].reverse();
  
  useEffect(() => {
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    try {
      const response = await AxiosService.get(`/appointments/user/${userId}`);
      setAppointments(response.data.appointments);
    } catch (err) {
      setError("Failed to fetch appointments. Please try again.");
      console.error("Error fetching appointments:", err);
    }
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await AxiosService.put(`/appointments/status/${id}`, { status });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt._id === id ? { ...appt, status } : appt
        )
      );
    } catch (err) {
      setError("Failed to update appointment status.");
      console.error("Error updating appointment:", err);
    }
  };

  const bookAgain = (store) => {
    navigate(`/store/${store._id}`, { state: { store } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          My Appointments
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {appointments.length ? (
          <ul className="space-y-4">
            {sortedAppointment.map((appointment) => (
              <li
                key={appointment._id}
                className="p-4 border rounded-lg shadow-sm flex justify-between items-start"
              >
                {/* Store Info */}
                <div className="flex items-center mb-4">
                  {appointment.storeId?.images && (
                    <img
                      src={appointment.storeId.images[0]}
                      alt={appointment.storeId.storeName}
                      className="w-32 h-32 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {appointment.storeId.storeName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.storeId.location}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Date:{" "}
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      Time:{" "}
                      {new Date(appointment.appointmentTime).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Status: {appointment.status}
                    </p>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="flex-grow">
                  <p className="text-sm text-gray-700 mt-8">
                    Services:
                    {appointment.serviceIds.map((service, index) => (
                      <span key={index} className="block text-sm">
                        {service.name} - {service.duration}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Cancel and Book Again Buttons */}
                <div className="flex space-x-3 mt-8">
                  {appointment.status !== "Cancelled" ? (
                    <button
                      onClick={() =>
                        updateAppointmentStatus(appointment._id, "Cancelled")
                      }
                      className="px-4 py-2 font-semibold rounded-lg bg-red-400 hover:bg-red-600 text-white focus:outline-none transition duration-200"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => bookAgain(appointment.storeId)}
                      className="px-1 py-1 font-semibold rounded-lg bg-green-400 hover:bg-green-600 text-white focus:outline-none transition duration-200"
                    >
                      Book Again
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No appointments scheduled.
          </p>
        )}
      </div>
    </div>
  );
};

export default Appointments;
