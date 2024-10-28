import { useAuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import { RoleContext } from "../Contexts/RoleContext";
import LogoutButton from "./LogoutButton";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const { authUser, setAuthUser } = useAuthContext();
  // const { role } = useContext(RoleContext);

  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen((prev) => !prev);
  // };

  return (
    <header className="bg-slate-100 shadow-2xl bg-gradient-to-r from-purple-400 to-blue-400">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-1.5 h-16">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-700">Book</span>
            <span className="text-slate-500 text-2xl">My </span>
            <span className="text-slate-800 text-3xl">Barber</span>
          </h1>
        </Link>

        <div className="flex items-center justify-center gap-3">
          {authUser ? (
            <>
              <h1 className="text-slate-600 text-sm sm:text-base font-bold">
                Welcome,{" "}
                <span className="text-slate-700">{authUser.userName}</span>
              </h1>
              <button
                type="submit"
                className="btn flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full p-4 transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1 active:scale-95 "
                onClick={""}
              >
                <FaRegUser className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>

              <LogoutButton />
            </>
          ) : (
            <Link to="/login">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </div>

        {/* <div className="relative">
          {authUser ? (
            <div className="flex items-center gap-4">
             
              <FaUserCircle
                size={32}
                className="text-slate-700 cursor-pointer"
                onClick={toggleDropdown}
              />
              <LogoutButton />
             
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="border-t border-gray-200"></div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
