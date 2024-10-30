import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../Hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-600">
      <div className="w-9/12 md:w-full max-w-sm p-6 rounded-lg shadow-slate-800 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70">
        <h1 className="text-3xl font-mono text-center">
          <span className="text-blue-500">Login</span>
        </h1>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="label p-2 ">
              <span className="text-black text-xl font-mono label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="text-black text-xl font-mono label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 bg-slate-500 rounded-lg input input-bordered h-10 focus:outline-none focus:ring focus:ring-cyan-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link
            to='/role-selection'
            className="text-base hover:underline text-slate-800 hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          {/* <Link
            to='/forgot-password'
            className="text-base ml-10 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Forget"} password
          </Link> */}
          <div>
            <button className="bg-slate-500 text-black text-xl font-mono btn-block rounded-lg btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-12 text-gray-300 font-mono">
        <h3>Sample User Login</h3>
        <p>email : user1234@gmail.com</p>
        <p>password : 12345678</p>
      </div>
    </div>
  );
};

export default Login;