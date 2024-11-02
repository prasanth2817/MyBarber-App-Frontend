import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { jwtDecode } from "jwt-decode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

const StoreDetails = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const Store = location.state?.store;

  
  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("User-token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;
      const storeId = Store._id;   

      const response = await AxiosService.put(`/user/favorites/add/${userId}`, {
        storeId,
      });
      toast.success(response.data.message || "Added to favorites!");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to add favorite");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    const FetchServices = async () => {
      try {
        setIsLoading(true); 
        const storeId = Store._id;
        const response = await AxiosService.get(`/services/${storeId}`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching all Stores:", error);
      }finally {
        setIsLoading(false);
      }
    };
    FetchServices();
  }, []);

  const handleSeeAllClick = () => {
    navigate("/services", { state: { Store, services } });
  };

  if (!Store) {
    return <div className="container mx-auto mt-16 p-4">No Store found.</div>;
  }

  return (
    <div className="mt-0 pt-0 p-4 bg-gradient-to-r from-blue-100 to-purple-100">

      <h2 className="text-3xl ml-4 lg:mx-12 font-bold mb-4 text-cyan-950 p-4 flex items-center space-x-4">
        {Store.storeName}
        <button
          onClick={handleAddToFavorites}
          className="text-gray- mt-2 ml-4 outline-slate-800 shadow-2xl bg-white p-2 rounded-full hover:text-red-700 transition duration-300"
        >
          <FaRegHeart className="w-4 h-4" />
        </button>
      </h2>

      {/* Desktop Grid Layout */}
      <div className="hidden lg:mx-12 md:grid grid-cols-10 gap-4 mb-6 h-96">
        <div className="col-span-7 h-full overflow-hidden rounded-lg shadow-md">
          {Store.images[0] && (
            <img
              src={Store.images[0]}
              alt="Main Store Image"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          )}
        </div>
        <div className="col-span-3 grid grid-rows-2 gap-4 h-full">
          {Store.images[1] && (
            <div className="h-full overflow-hidden rounded-lg shadow-md">
              <img
                src={Store.images[1]}
                alt="Store Image 1"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          )}
          {Store.images[2] && (
            <div className="h-full overflow-hidden rounded-lg shadow-md">
              <img
                src={Store.images[2]}
                alt="Store Image 2"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Swiper UI */}
      <div className="block md:hidden mb-6">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="h-96"
        >
          {Store.images.map((image, i) => (
            <SwiperSlide key={i}>
              <img
                src={image}
                alt={`Store-${i}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mb-4 lg:mx-12 text-xl font-light">
        <p className="text-xl text-gray-800 font-semibold">Services:</p>
      </div>

      <div className="grid grid-cols-10 lg:mx-12 gap-4">
        {/* Services Section - 70% Width */}
        <div className="col-span-7">
          <div className="grid grid-cols-1 gap-4">
            {isLoading ? (
            <div className="col-span-full flex justify-center items-center h-64">
              <span className="loading loading-spinner bg-purple-400 w-4 h-4 sm:w-8 sm:h-8"></span>
            </div>
          ) : services && services.length > 0 ? (
              services.slice(0, 3).map((service) => (
                <div
                  key={service._id}
                  className="flex justify-between bg-white shadow-md rounded-lg p-4"
                >
                  <div>
                    <h3 className="text-lg text-slate-700 font-semibold">
                      {service.name}
                    </h3>
                    <p className="text-sm">Price: Rs.{service.price}</p>
                    <p className="text-sm">Duration: {service.duration}</p>
                  </div>

                  <div>
                    <button
                      className="px-3 py-1 mt-4 bg-gray-200 hover:bg-gray-300 text-slate-600 rounded-xl"
                      onClick={handleSeeAllClick}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No services available</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-3 py-1 mt-4 bg-white text-gray-700 rounded-xl"
              onClick={handleSeeAllClick}
            >
              See All
            </button>
          </div>
        </div>

        {/* Store Details Section - 30% Width */}
        <div className="col-span-3">
          <div className="card bg-white shadow-xl p-4">
            <h2 className="card text-purple-500 font-bold text-xl">
              {Store.storeName}
            </h2>
            <div className="mt-2">
              <p className="font-semibold text-sm text-gray-600"> <span className="font-bold text-lg text-purple-500">Opens at: </span> {Store.timings}</p>
              <p className="font-semibold text-sm text-gray-600"><span className="font-bold text-lg text-purple-500">Address: </span> {Store.address}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary" onClick={handleSeeAllClick}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
