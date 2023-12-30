import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { DarkModeProvider } from './ components/DarkModeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/Forgotpassword';
import ResetPassword from './pages/Resetpassword';
import Verifylogin from './pages/Verifylogin';
import Home from './ components/Home';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('auth');
    if (authToken) {
      setAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return authenticated ? children : null;
};

const App = () => {
  return (
    <Router>
      <DarkModeProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/login/:token" element={<Verifylogin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset/password/:token" element={<ResetPassword />} />
        </Routes>
      </DarkModeProvider>
    </Router>
  );
};

export default App;
