import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { useAuth } from './AuthContext';

// Create UserContext
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
const {logout} = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
        if(err.response.status === 400){
            localStorage.removeItem('token')
            logout()
        }
      setError(err.response ? err.response.data.error : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    fetchUserData();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser, clearUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => {
  return useContext(UserContext);
};
