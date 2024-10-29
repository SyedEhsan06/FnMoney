import React from 'react';
import { useUser } from '../context/userContext';
import Navbar from './Navbar'; // Import the Navbar component

const UserProfile = () => {
  const { user, loading, error } = useUser();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> {/* Add Navbar here */}
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">User Profile</h2>
          {user ? (
            <div className="space-y-5">
              <div className="flex items-center">
                <strong className="w-1/3 text-gray-700">Username:</strong>
                <p className="text-gray-600">{user.username}</p>
              </div>
              <div className="flex items-center">
                <strong className="w-1/3 text-gray-700">Email:</strong>
                <p className="text-gray-600">{user.email}</p>
              </div>
              {/* Add other user details as needed */}
              <div className="flex items-center">
                <strong className="w-1/3 text-gray-700">Joined:</strong>
                <p className="text-gray-600">{user.joinedDate || 'N/A'}</p>
              </div>
              <div className="flex items-center">
                <strong className="w-1/3 text-gray-700">Role:</strong>
                <p className="text-gray-600">{user.role || 'User'}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No user data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
