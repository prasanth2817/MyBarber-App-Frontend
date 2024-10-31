import React from "react";
import { useNavigate } from "react-router-dom";

const storeCard = ({ store }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/store/${store._id}`, { state: { store } });
  };

  return (
    <div
  onClick={handleClick}
  className="cursor-pointer border border-gray-300 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
>
  <div className="relative">
    <img
      src={store.images[0]}
      alt={store.storeName}
      className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
  <div className="p-4 flex flex-col justify-between h-28">
    <h3 className="text-base text-black font-semibold mb-1 truncate">{store.storeName}</h3>
    <div className="mt-auto">
      <p className="text-gray-500 font-semibold text-sm font- mb-2">{store.location}</p>
      <p className="text-center text-gray-200 bg-blue-500 p-0.5 rounded-full text-xs font-medium w-1/2 lg:w-4/12">
        {store.venueType}
      </p>
    </div>
  </div>
</div>
  );
};

export default storeCard;