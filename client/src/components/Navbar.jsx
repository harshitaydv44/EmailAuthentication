import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      if (data.success) {
        toast.success(data.message);
        navigate('/email-verify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 shadow-md">
      <div className="flex items-center gap-2">
        <img src={assets.auth_logo} alt="Logo" className="w-16 sm:w-24 h-auto" />
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Auth-App</h1>
      </div>

      {userData ? (
        <div className="relative group">
          {/* User icon */}
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer">
            {userData.name?.[0]?.toUpperCase() || 'U'}
          </div>

          {/* Dropdown menu */}
          <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md p-2 text-sm min-w-[150px] hidden group-hover:block z-10">
            <ul>
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-200"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
