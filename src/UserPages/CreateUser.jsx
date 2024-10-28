import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosService from "../Common/ApiServices";

function SignUp() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

//   Fields for agent-specific data
  const [storeName, setstoreName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedRole = queryParams.get("role") || "user";
    setRole(selectedRole);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      fullName,
      userName,
      email,
      password,
      role,
    };
    // Add agent-specific fields if the role is "agent"
    if (role === "businessUser") {
      payload = { ...payload, storeName };
    }

    // Set the endpoint based on the role
    const endpoint = role === "businessUser" ? "/businessUsers/register" : "/user/register";
    try {
      const res = await AxiosService.post(endpoint, payload);
      if (res.status === 201) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error Occurred! Please try again later."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="w-9/12 md:w-full max-w-sm p-6 rounded-lg shadow-xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h2 className="text-3xl font-semibold text-center text-gray-300">
          Sign <span className="text-blue-500 font-extrabold text-4xl">Up</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-base label-text">Full Name</label>
            <input
              type="text"
              value={fullName}
              placeholder="Enter Full Name"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-slate-100 input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">User Name</label>
            <input
              type="text"
              value={userName}
              placeholder="Enter User Name"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full text-slate-100 input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">Email address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-slate-100 input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <label className="text-base label-text">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-slate-100 input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
            />
          </div>
          {/* Agent-specific fields, only show if role is "agent" */}
          {role === "businessUser" && (
            <>
              <div>
                <label className="text-base label-text">Store Name</label>
                <input
                  type="text"
                  value={storeName}
                  placeholder="Enter Store Name"
                  onChange={(e) => setstoreName(e.target.value)}
                  className="w-full text-slate-100 input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
                />
              </div>
            </>
          )}
          {/* Hidden role input */}
          <input type="hidden" value={role} />
          <div className="mt-8">
            <button className="btn btn-block btn-sm mt-2">
              <span className="text-slate-100 font-bold"> Sign Up</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;