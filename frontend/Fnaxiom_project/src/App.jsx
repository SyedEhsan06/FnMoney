import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';
import Todos from './components/Todos';
import PrivateRoute from './ProtectedRoutes/PrivateRoute';


import UserProfile from './components/UserProfile';
import { UserProvider } from './context/userContext';


const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} /> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/todos" element={<PrivateRoute element={<Todos />} />} />
        </Routes>
      </Router>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
