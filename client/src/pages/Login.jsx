import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppContext} from '../context/AppContext.jsx'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {

  const navigate = useNavigate();

  const {backendUrl,setIsLoggedIn,getUserData} = useContext(AppContext)

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      // e.preventDefault();

      axios.defaults.withCredentials = true;

      if( state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/auth/register',{name,email,password})
        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }else {
       const {data} = await axios.post(backendUrl + '/api/auth/login',{email,password});
        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message)
        }
      }

    } catch(error){
     toast.error(error.respone?.data?.message || error.message);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 sm:px-0 font-outfit">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-primary-600 mb-2 text-center">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-primary-700 text-sm mb-6 text-center">
          {state === 'Sign Up'
            ? 'Create your account to get started'
            : 'Login to your account!'}
        </p>

        {/* Form */}
        <form 
        onSubmit={onSubmitHandler}
        className="space-y-4">
          {state === 'Sign Up' && (
            <input
            onChange = {e => setName(e.target.value)}
            value = {name}
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          )}

          <input
          onChange = {e => setEmail(e.target.value)}
            value = {email}
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          <div>
            <input
            onChange = {e => setPassword(e.target.value)}
            value = {password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <div className="text-right mt-1">
  <a
   onClick={() => navigate('/reset-password')}
    href="#"
    className="text-sm text-primary-600 hover:underline"
  >
    Forgot password?
  </a>
</div>

          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-md transition duration-200"
          >
            {state}
          </button>
        </form>

        {/* Toggle Text */}
        <p className="text-sm text-center mt-6 text-primary-700">
          {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
            className="text-primary-600 font-medium cursor-pointer hover:underline"
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
