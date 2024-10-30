import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreCard from "../UserComponents/CardListing";
import AxiosService from "../Common/ApiServices";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchstores = async () => {
      try {
        const response = await AxiosService.get(
          "/stores"
        );
        setStores(response.data.store);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchstores();
  }, []);
  

  // Take only the first 3 stores for the preview
  const previewstores = stores.slice(0, 4);

  return (
    <div className="container mx-auto w-full p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h2 className="text-lg font-semibold mb-4">Store Listings</h2>

      {/* Grid displaying only first 3 stores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {previewstores.map((store, index) => (
          <StoreCard key={index} store={store} />
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate('/allstores')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default StoreList;