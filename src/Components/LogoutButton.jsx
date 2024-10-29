// import { ImExit } from "react-icons/im";
// import useLogout from "../Hooks/useLogout";

// const LogoutButton = () => {
//   const { loading, logout } = useLogout();

//   return (
//     <div className="mt-auto flex justify-center items-center outline-none focus:ring-0">
//       {!loading ? (
//           <button
//           type="submit"
//           className="btn flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full p-4 transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1 active:scale-95 "
//           onClick={logout}
//         >
//           <ImExit 
//             className="w-5 h-5 sm:w-4 sm:h-4"
//           />
//         </button>
        
        
//       ) : (
//         <span className="loading loading-spinner"></span>
//       )}
//     </div>
//   );
// };

// export default LogoutButton;

import { ImExit } from "react-icons/im";
import useLogout from "../Hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="flex justify-center items-center">
      {!loading ? (
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-full p-2 sm:p-3 transition duration-200 ease-in-out shadow-md hover:shadow-lg hover:from-purple-500 hover:to-blue-400 transform hover:-translate-y-1 active:scale-95"
          onClick={logout}
        >
          <ImExit className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      ) : (
        <span className="loading loading-spinner w-4 h-4 sm:w-5 sm:h-5"></span>
      )}
    </div>
  );
};

export default LogoutButton;
