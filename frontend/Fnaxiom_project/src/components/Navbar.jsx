import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext'; // Import your user context

const Navbar = () => {
  const { user } = useUser(); // Get user state from context
  const nav = useNavigate();
  const token = localStorage.getItem('token'); // Check if token exists

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    nav('/'); // Navigate to home page after logout
    //reload the page
    window.location.reload();
  };

  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">FnMoney</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:bg-green-500 rounded-md px-3 py-2 transition duration-300">
            Home
          </Link>
          <Link to="/todos" className="text-white hover:bg-green-500 rounded-md px-3 py-2 transition duration-300">
            Todos
          </Link>

          {user && token ? ( // Use && instead of &
            <>
              <button
                onClick={logout}
                className="text-white hover:bg-red-500 rounded-md px-3 py-2 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-green-500 rounded-md px-3 py-2 transition duration-300">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:bg-green-500 rounded-md px-3 py-2 transition duration-300">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
