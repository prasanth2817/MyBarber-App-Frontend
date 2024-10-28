import { useState } from 'react';
import AxiosService from '../Common/ApiServices';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const validateEmail = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post('/user/forgot-password', { email });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Password reset link has expired. Please initiate the process again.');
      } else {
        toast.error(error.response.data.message || 'Error Occurred! Please try again later.');
      }
    }
  };

  return (
    <section className='bg-black'>
    <div className="container mx-auto max-w-md">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={validateEmail} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border text-slate-50 border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </section>
  );
}

export default ForgotPassword;