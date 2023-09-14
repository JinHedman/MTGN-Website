import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import LoginPage from './pages/Login';
import LandingPage from './pages/LandingPage';
import Cookies from 'js-cookie';
import PhotoPage from './pages/Photos';
import Profile from './pages/Profile';
import SchedulePage from './pages/Schedule';
import ContactBook from './pages/ContactBook';
import PhosBook from './pages/PhosBook';

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); 

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoadingUser(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <ChakraProvider>
      <Router>
        {loadingUser ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/" element={user !== null ? <LandingPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/photos" element={user !== null ? <PhotoPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user !== null ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/phos" element={user !== null ? <PhosBook user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/contacts" element={user !== null ? <ContactBook onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/schedule" element={user !== null ? <SchedulePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          </Routes>
        )}
      </Router>
    </ChakraProvider>
  );
}

export default App;
