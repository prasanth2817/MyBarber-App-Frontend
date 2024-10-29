import { useAuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import useLogout from "../Hooks/useLogout";

const Header = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  console.log(authUser);
  

  return (
    <header className="bg-slate-100 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg shadow-purple-400/50">
      <div className="flex sm:flex-row justify-between items-center max-w-6xl mx-auto py-3 sm:py-1.5 lg:h-20 sm:h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <Link to="/">
          <h1 className="font-bold text-center text-xs sm:text-xl flex flex-wrap">
            <span className="text-slate-700 text-sm lg:text-base">Book</span>
            <span className="text-slate-500 text-md lg:text-2xl">My </span>
            <span className="text-slate-800 text-lg lg:text-3xl">Barber</span>
          </h1>
        </Link>

        {/* Auth Section */}
        <div className="flex items-center justify-center gap-3 mt-2 sm:mt-0">
          {authUser ? (
            <>
              <h1 className="text-slate-600 text-xs sm:text-base font-bold">
                Welcome, <span className="text-slate-700">{authUser.userName}</span>
              </h1>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full p-2 sm:p-4 transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1 active:scale-95"
                onClick={() => {}}
              >
                <FaRegUser className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full p-2 sm:p-4 transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1 active:scale-95"
                onClick={logout}
              >
                <ImExit className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
            </>
          ) : (
            <Link to="/login" className="text-slate-700 hover:underline text-xs sm:text-base">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
