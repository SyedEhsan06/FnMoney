import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useUser } from '../context/userContext'; // Import user context

const LandingPage = () => {
  const { user , fetchUserData} = useUser(); // Get user state from context
  const token = localStorage.getItem('token'); // Check if token exists
  useEffect(() => {
    fetchUserData();
  }
  , []); // Fetch user data on component mount
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-300">
        <div className="text-center mt-20">
          {user && token ? ( // Check if user and token exist
            <>
              <h1 className="text-5xl font-extrabold text-green-800 mb-4 animate-pulse">
                Welcome, {user.username}!
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Create your todos and manage your tasks efficiently!
              </p>
              <Link to="/todos">
                <button className="bg-green-600 text-white rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-700">
                  Go to Your Todos
                </button>
              </Link>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-extrabold text-green-800 mb-4 animate-pulse">
                FnMoney
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Your gateway to efficient task management!
              </p>
              <Link to="/login">
                <button className="bg-green-600 text-white rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-700">
                  Login to Continue
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
