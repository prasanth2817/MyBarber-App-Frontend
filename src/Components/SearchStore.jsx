import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

function StoreSearch() {
  const [query, setQuery] = useState("");
  const [venueType, setVenueType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query && !venueType) {
      toast.error("Please fill in at least one search field.");
      return;
    }

    // Validation for propertyType field if required
    if (venueType === "") {
      toast.error("Please select a venue type.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await AxiosService.get("/stores/search", {
        params: {
          query,
          venueType
        },
      });   
      
      // Check for successful response
      if (response.status === 200) {
        navigate("/listings", { state: { stores: response.data } });
      } else {
        toast.error(response.data.error || "Unexpected error occurred.");
      }
    } catch (error) {
      // Error handling block
      if (error.response) {
        // Check for specific error responses
        if (error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("User-token");
          navigate("/login");
        } else {
          toast.error(
            error.response.data.message ||
              "Error searching properties. Please try again."
          );
        }
      } else {
        // Handle network errors or other types of errors
        toast.error("Network error. Please check your connection.");
      }
      console.error("Error searching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-gray-700 bg-opacity-70 p-2 lg:p-6 xl:p-16 rounded-md shadow-md">
      <h1 className="text-center my-4 text-base lg:text-lg font-bold p-4 text-gray-200">
        {" "}
        Search Saloons{" "}
      </h1>
      <div className="flex flex-col gap-6 justify-center xl:gap-16 md:gap-10">
        <div className="flex flex-col lg:flex-row justify-center gap-6 field relative">
          <input
            type="text"
            placeholder="Search by Saloons Name or Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full lg:w-9/12 p-1.5 lg:p-3 text-base lg:text-lg font-medium border rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={venueType}
            onChange={(e) => setVenueType(e.target.value)}
            className="w-6/12 lg:w-3/12 ml-24 lg:ml-0 p-0.5 lg:p-1 text-base lg:text-lg font-medium  border rounded-lg text-gray-400 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value=""> Saloon Type</option>
            <option className="text-base lg:text-lg font-medium" value="unisex">UniSex</option>
            <option className="text-base lg:text-lg font-medium" value="womens">Womens</option>
            <option className="text-base lg:text-lg font-medium" value="mens">Mens</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleSearch}
            className={`w-3/12 mb-6 lg:mb-0 p-0.5 lg:p-2 text-base lg:text-lg font-normal lg:font-medium text-center hover:divide-teal-500 bg-blue-500 text-white rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreSearch;