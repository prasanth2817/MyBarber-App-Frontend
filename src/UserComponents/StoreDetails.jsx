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

const StoreDetails = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const Store = location.state?.store;

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("User-token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.id;
      const StoreId = Store._id;

      const response = await AxiosService.post("/favorites/create", {
        StoreId,
        userId,
      });
      toast.success(response.data.message);
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
        const storeId = Store._id;
        const response = await AxiosService.get(`/services/${storeId}`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching all Stores:", error);
      }
    };
    FetchServices();
  }, []);

  const handleContactSeller = () => {
    toast.success(
      `Contact request received for ${Store.StoreName}. The seller will get back to you soon.`
    );
  };

  const handleSeeAllClick = () => {
    navigate("/services", { state: { Store, services } });
  };

  if (!Store) {
    return <div className="container mx-auto mt-16 p-4">No Store found.</div>;
  }

  return (
    <div className="mt-0 pt-0 p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <h2 className="text-3xl font-semibold mb-4 text-cyan-950 p-4">
        {Store.storeName}
      </h2>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-10 gap-4 mb-6 h-96">
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
      <div className="mb-4 text-xl font-light">
        <p className="font-semibold">Services:</p>
      </div>

      <div className="grid grid-cols-10 gap-4">
        {/* Services Section - 70% Width */}
        <div className="col-span-7">
          <div className="grid grid-cols-1 gap-4">
            {services && services.length > 0 ? (
              services.slice(0, 3).map((service) => (
                <div
                  key={service._id}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <p className="text-sm">Price: ${service.price}</p>
                  <p className="text-sm">Duration: {service.duration}</p>
                </div>
              ))
            ) : (
              <p>No services available</p>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary" onClick={handleSeeAllClick}>
              See All
            </button>
          </div>
        </div>

        {/* Store Details Section - 30% Width */}
        <div className="col-span-3">
          <div className="card bg-white shadow-xl p-4">
            <h2 className="card-title font-bold text-xl">{Store.storeName}</h2>
            <div className="mt-2">
              <p className="font-semibold">Opens at: {Store.timings}</p>
              <p className="font-semibold">Address: {Store.address}</p>
            </div>
            <div className="flex justify-center mt-4">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleAddToFavorites}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add to Favorites
        </button>
        <button
          onClick={handleContactSeller}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Book An Appointment
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;
