import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../UserComponents/CardListing";
import AxiosService from "../Common/ApiServices";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setIsLoading(true);
        const response = await AxiosService.get("/stores");
        setStores(response.data.store);
      } catch (error) {
        console.error("Error fetching all Stores:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);
  
  // Take only the first 4 stores for the preview
  const previewStores = stores.slice(0, 4);

  return (
    <div className="container mx-auto w-full p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h2 className="text-2xl font-semibold mb-4 p-5">Store Listings</h2>

      {/* Grid displaying only the first 4 stores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <span className="loading loading-spinner bg-purple-400 w-4 h-4 sm:w-8 sm:h-8"></span>
          </div>
        ) : previewStores.length > 0 ? (
          previewStores.map((store, index) => (
            <StoreCard key={index} store={store} />
          ))
        ) : (
          <p className="col-span-full text-center text-xl">No Stores Available</p>
        )}
      </div>

      {/* View More Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/allstores')}
          className={`bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition ${
            previewStores.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={previewStores.length === 0}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default StoreList;
