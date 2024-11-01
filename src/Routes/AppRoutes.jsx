import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Contexts/AuthContext";
import Home from "../Components/Home";
import Login from "../UserPages/LoginPage";
import RoleSelection from "../UserPages/RoleSelection";
import SignUp from "../UserPages/CreateUser";
import ForgotPassword from "../UserPages/ForgetPassword";
import ResetPassword from "../UserPages/ResetPassword";
import Header from "../Components/Header";
import StoreDetails from "../UserComponents/StoreDetails";
import StoreSearch from "../Components/SearchStore";
import AllStoreListing from "../UserComponents/AllStores";
import ServicePage from "../StorePages/ServicePage";
import Schedule from "../StorePages/Schedule";
import SelectProfessional from "../StorePages/SetProfessionals";
import ReviewAndConfirmPage from "../StorePages/ReviewAndConfirmPage";
import ConfirmationPage from "../StorePages/ConfirmationPage";
import StoreListing from "../Components/StoreListings";

function AppRoutes() {
  const { authUser } = useAuthContext();
  const location = useLocation();
  return (
    <>
    {location.pathname !== "/login" && location.pathname !== "/role-selection" && location.pathname !== "/signUp" && <Header />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/store/:id" element={<StoreDetails />} />
        <Route path="/listings" element={<StoreListing />} />
        <Route path="/allstores" element={<AllStoreListing />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/setprofessionals" element={<SelectProfessional />} />
        <Route path="/reviewandconfirm" element={<ReviewAndConfirmPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default AppRoutes;