import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { jwtDecode } from "jwt-decode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

const StoreDetails = () => {
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

  const handleContactSeller = () => {
    toast.success(
      `Contact request received for ${Store.StoreName}. The seller will get back to you soon.`
    );
  };

  if (!Store) {
    return (
      <div className="container mx-auto mt-16 p-4">No Store found.</div>
    );
  }

  return (
    <div
      className="container mx-auto mt-16 p-4"
      style={{ marginTop: "0", paddingTop: "0" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-slate-800">
        Store Details
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-cyan-950">
        {Store.StoreName}
      </h2>

      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mb-6"
      >
        {Store.images.map((image, i) => (
          <SwiperSlide key={i}>
            <img
              src={image}
              alt={`Store-${i}`}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mb-4 text-xl font-light">
        <p className="font-semibold">Store Type: {Store.StoreType}</p>
        <p className="font-semibold">Location: {Store.location}</p>
        <p className="font-semibold">Price: ${Store.price}</p>
        <p className="font-semibold">Description: {Store.description}</p>
        <p className="font-semibold">Status: {Store.StoreStatus}</p>
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
          Contact Seller
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;