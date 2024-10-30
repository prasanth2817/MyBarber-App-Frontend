import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../UserComponents/CardListing";
import AxiosService from "../Common/ApiServices";

const StoreListing = () => {
  const location = useLocation();
  const searchResults = location.state?.stores || [];
  const [allStores, setAllStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [venueType, setVenueType] = useState([]);
  const [filteredStores, setFilteredStores] = useState(searchResults);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkboxes, setCheckboxes] = useState({
    unisex: false,
    mens: false,
    womens: false,
  });

  // Fetch all Stores
  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        setIsLoading(true);
        const response = await AxiosService.get("/stores");
        setAllStores(response.data.store);
      } catch (error) {
        console.error("Error fetching all Stores:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllStores();
  }, []);

  useEffect(() => {
    const newSearchResults = location.state?.stores || [];
    setFilteredStores(newSearchResults);
  }, [location.state]);

  // Enable the filter button if any filter inputs are provided
  useEffect(() => {
    if (searchTerm || venueType.length > 0) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [searchTerm, venueType]);

  // Handle filtering and sorting
  const handleFilter = () => {
    let filtered = Array.isArray(allStores) ? allStores : [];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((store) =>
        store.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by venue type

    if (venueType.length > 0) {
      filtered = filtered.filter((venue) =>
        venueType.includes(venue.venueType)
      );
    }

    setFilteredStores(filtered);
  };

  // Handle property type change
  const handleVenueTypeChange = (e) => {
    const { value, checked } = e.target;

    // Update checkbox state
    setCheckboxes((prevState) => ({
      ...prevState,
      [value]: checked,
    }));

    if (checked) {
      // Add the property type to the array
      setVenueType((prevTypes) => [...prevTypes, value]);
    } else {
      // Remove the property type from the array
      setVenueType((prevTypes) => prevTypes.filter((type) => type !== value));
    }
  };

  // Reset filters to original state
  const resetFilters = () => {
    setSearchTerm("");
    setVenueType([]);
    setFilteredStores(allStores);
    setCheckboxes({
      unisex: false,
      mens: false,
      womens: false,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row p-2 min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {/* Sidebar for filters */}
      <div className="w-full lg:w-1/4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 overflow-auto shadow-purple-400/50">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Search by Store location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Search by location</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded"
            placeholder="Search by property location"
          />
        </div>

        {/* venue Type Filter (Checkboxes) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Venue Type</label>
          <div>
            <label className="block">
              <input
                type="checkbox"
                value="unisex"
                checked={checkboxes.unisex}
                onChange={handleVenueTypeChange}
              />{" "}
              Unisex
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="mens"
                checked={checkboxes.mens}
                onChange={handleVenueTypeChange}
              />{" "}
              Mens
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="womens"
                checked={checkboxes.womens}
                onChange={handleVenueTypeChange}
              />{" "}
              Womens
            </label>
          </div>
        </div>

        {/* Apply Filter Button */}
        <button
          onClick={handleFilter}
          disabled={!isFilterApplied}
          className={`w-full p-2 text-white rounded flex items-center justify-center ${
            isFilterApplied
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Apply Filters
        </button>

        <button
          onClick={resetFilters}
          className="w-full p-2 text-white rounded mt-4 bg-red-400 hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Property Cards */}
      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Store Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <span className="loading loading-spinner bg-purple-400 w-4 h-4 sm:w-8 sm:h-8"></span>
            </div>
          ) : filteredStores.length > 0 ? (
            filteredStores.map((store, index) => (
              <PropertyCard key={index} store={store} />
            ))
          ) : (
            <p className="w-full text-center text-2xl">No Stores found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreListing;
