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
      className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={store.images[0]}
          alt={store.storeName}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold mb-1">{store.storeName}</h3>
        <p className="text-gray-700 text-sm mb-1">{store.location}</p>
        <p className="text-gray-700 text-sm mb-1">${store.price}</p>
        <p className="text-gray-700 text-sm">{store.storeType}</p>
      </div>
    </div>
  );
};

export default storeCard;