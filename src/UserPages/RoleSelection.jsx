import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Select Your Role
        </h2>
        <p className="text-gray-600 mb-6">
          Choose whether you want to sign up as a buyer or a seller.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection("user")}
            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg font-medium transition duration-300"
          >
            Sign Up as User
          </button>
          <button
            onClick={() => handleRoleSelection("businessUser")}
            className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-md text-lg font-medium transition duration-300"
          >
            Sign Up as BusinessUser
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;