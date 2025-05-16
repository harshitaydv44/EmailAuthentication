import React, { useContext, useRef,useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, getUserData,isLoggedIn,userData } = useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Handle individual input
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Submit OTP
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((ref) => ref?.value || '');
    const otp = otpArray.join('');

    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });

      if (data.success) {
        toast.success(data.message);
        getUserData(); // ✅ Correct case
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
     isLoggedIn && userData.isAccountVerified && navigate('/')
  },[isLoggedIn,userData])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 font-outfit">
      <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-md shadow-lg w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-2 text-center">Email Verification</h1>
        <p className="text-sm text-gray-600 text-center mb-6">Enter the 6-digit OTP sent to your email.</p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
  type="submit"
  className="w-full bg-primary-600 text-white rounded-md hover:bg-primary-700 py-2 transition"
>
  Verify Email
</button>

      </form>
    </div>
  );
};

export default EmailVerify;
