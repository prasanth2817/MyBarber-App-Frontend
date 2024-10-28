import React, { useState, useEffect } from "react";
import StoreCard from "./CardListing";
import AxiosService from "../Common/ApiServices";

const AllStoreListing = () => {
  const [allStores, setAllStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");
  const [venueType, setVenueType] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    forEveryOne: false,
    womens: false,
    mens: false,
  });

  // Fetch all Stores
  useEffect(() => {
    const fetchAllStores = async () => {
      try {
        const response = await AxiosService.get("/stores");
        setAllStores(response.data.store);
        setFilteredStores(response.data.store);
      } catch (error) {
        console.error("Error fetching all Stores:", error);
      }
    };
    fetchAllStores();
  }, []);
  
  // Enable the filter button if any filter inputs are provided
  useEffect(() => {
    if (
      searchTerm ||
      venueType.length > 0 ||
      searchByLocation
    ) {
      setIsFilterApplied(true);
    } else {
      setIsFilterApplied(false);
    }
  }, [searchTerm, venueType, searchByLocation]);

  // Handle filtering 
  const handleFilter = () => {
    let filtered = allStores; // Always filter from allStores

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((Store) =>
        Store.storeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (searchByLocation) {
      filtered = filtered.filter((Store) =>
        Store.location.toLowerCase().includes(searchByLocation.toLowerCase())
      );
    }

    // Filter by Store type

    if (venueType.length > 0) {
      filtered = filtered.filter((Store) =>
        venueType.includes(Store.venueType)
      );
    }

    setFilteredStores(filtered);
  };

  // Handle Venue type change
  const handleVenueTypeChange = (e) => {
    const { value, checked } = e.target;

    // Update checkbox state
    setCheckboxes((prevState) => ({
      ...prevState,
      [value]: checked,
    }));

    if (checked) {
      // Add the Store type to the array
      setVenueType((prevTypes) => [...prevTypes, value]);
    } else {
      // Remove the Store type from the array
      setVenueType((prevTypes) =>
        prevTypes.filter((type) => type !== value)
      );
    }
  };

  // Reset filters to original state
  const resetFilters = () => {
    setSearchTerm("");
    setVenueType([]);
    setSearchByLocation("");
    setFilteredStores(allStores);
    setCheckboxes({
      forEveryOne: false,
      womens: false,
      mens: false,
  });
}

  return (
    <div className="flex flex-col lg:flex-row p-2 min-h-screen">
      {/* Sidebar for filters */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

{/* Search by Store Name */}
<div className="mb-4">
          <label className="block text-gray-700 mb-2">Search by Store Name</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded text-white"
            placeholder="Search by StoreName"
          />
        </div>

        {/* Search by Store location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Search by location</label>
          <input
            type="text"
            value={searchByLocation}
            onChange={(e) => setSearchByLocation(e.target.value)}
            className="w-full p-2 border bg-slate-700 border-gray-300 rounded text-white"
            placeholder="Search by Store location"
          />
        </div>

        {/* Store Type Filter (Checkboxes) */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Venue Type</label>
          <div>
            <label className="block">
              <input
                type="checkbox"
                value="forEveryOne"
                checked={checkboxes.forEveryOne}
                onChange={handleVenueTypeChange}
              />{" "}
              For EveryOne
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
            <label className="block">
              <input
                type="checkbox"
                value="mens"
                checked={checkboxes.mens}
                onChange={handleVenueTypeChange}
              />{" "}
              Mens
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

      {/* Store Cards */}
      <div className="w-full lg:w-3/4 p-4">
        <h2 className="text-lg font-semibold mb-4">Store Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.length > 0 ? (
            filteredStores.map((Store, index) => (
              <StoreCard key={index} store={Store} />
            ))
          ) : (
            <p className="w-full text-center text-2xl">
              No Stores found matching the criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllStoreListing;