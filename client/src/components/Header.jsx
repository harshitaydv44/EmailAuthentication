import React,{useContext} from 'react';
import { AppContext} from '../context/AppContext.jsx'

const Header = () => {

  const {userData}  = useContext(AppContext)

  return (
    <header className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 rounded-lg shadow-md text-center max-w-2xl mx-auto mt-8">
      <h2 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
        Hello {userData ? userData.name:'Developer'}! <span className="inline-block animate-wave">👋</span>
      </h2>

      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6">
        Welcome to our app
      </h1>

      <button className="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition duration-200 text-base font-medium">
        Get Started
      </button>
    </header>
  );
};

export default Header;
