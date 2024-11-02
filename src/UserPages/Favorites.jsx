import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosService from "../Common/ApiServices";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const userId = authUser.id;

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await AxiosService.put(`/user/favorites/${userId}`);
        if (response.data.favorites.length === 0) {
          setError("No favorites found.");
        } else {
          setFavorites(response.data.favorites);
        }
      } catch (error) {
        setError("Failed to fetch favorites. Please try again later.");
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFavorite = async (storeId) => {
    try {
      await AxiosService.put(`/user/favorites/remove/${userId}`, { storeId });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((store) => store._id !== storeId)
      );
      if (favorites.length === 1) setError("No favorites found.");
    } catch (error) {
      setError("Failed to remove favorite. Please try again.");
      console.error("Error removing favorite:", error);
    }
  };

  const handleStoreClick = (store) => {
    navigate(`/store/${store._id}`, { state: { store } });
  };

  return (
    // <div className="p-6 min-h-screen">
    //   <h2 className="text-2xl font-bold mb-4">Your Favorite Stores</h2>
    //   {favorites.length === 0 ? (
    //     <p>No favorites found.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {favorites.map((store) => (
    //         <div
    //           key={store._id}
    //           className="bg-white shadow-lg rounded-lg p-4 cursor-pointer overflow-hidden hover:shadow-xl transition-shadow"
    //           onClick={() => handleStoreClick(store._id)}
    //         >
    //           <div className="relative">
    //             <img
    //               src={store.images[0]}
    //               alt={store.storeName}
    //               className="w-full h-44 object-cover transition-transform duration-500 hover:scale-105"
    //             />
    //           </div>
    //           <h3 className="text-lg font-semibold">{store.storeName}</h3>
    //           <p className="text-gray-600">{store.location}</p>
    //           <p className="text-center text-gray-200 bg-blue-500 p-0.5 rounded-full text-xs font-medium w-1/2 lg:w-4/12">
    //             {store.venueType}
    //           </p>
    //           <button
    //             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               handleRemoveFavorite(store._id);
    //             }}
    //           >
    //             Remove from Favorites
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
    <h2 className="text-2xl font-bold mb-4">Your Favorite Stores</h2>
    
    {!favorites.length ? (
      <p className="text-center font-semibold text-2xl mt-20">No favorites found.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((store) => (
          <div
            key={store._id}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer overflow-hidden hover:shadow-xl transition-shadow"
            onClick={() => handleStoreClick(store)}
          >
            <div className="relative">
              <img
                src={store.images[0]}
                alt={store.storeName}
                className="w-full h-44 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold mt-2">{store.storeName}</h3>
            <p className="text-gray-600">{store.location}</p>
            <p className="text-center mt-2 text-gray-200 bg-blue-500 p-0.5 rounded-full text-xs font-medium w-1/2 lg:w-4/12">
              {store.venueType}
            </p>
            <button
                className="mt-4 px-2 py-1 font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(store._id);
                }}
              >
                Remove
              </button>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default Favorites;
