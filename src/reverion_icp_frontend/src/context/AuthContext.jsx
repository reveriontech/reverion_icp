import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create an authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps your app and makes auth object available to any
// child component that calls useAuth().
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to get the current canister ID from URL
  const getCanisterId = () => {
    // Check for canisterId in search params
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('canisterId');
  };

  // Check if there's a stored user session when the app loads
  useEffect(() => {
    const checkUserSession = () => {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // If we're on the root path but user is logged in, navigate to portal
          if (location.pathname === '/' && !location.pathname.includes('portal')) {
            const canisterId = getCanisterId();
            if (canisterId) {
              navigate(`/?canisterId=${canisterId}#/portal`);
            } else {
              navigate('/portal');
            }
          }
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          // Clear invalid data
          localStorage.removeItem('user');
          sessionStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    checkUserSession();
  }, [navigate, location]);

  // Login function
  const login = (userData, rememberMe = false) => {
    // Store user data in appropriate storage
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    
    setUser(userData);
    
    // Handle navigation with canisterId if present
    const canisterId = getCanisterId();
    if (canisterId) {
      navigate(`/?canisterId=${canisterId}#/portal`);
    } else {
      navigate('/portal');
    }
  };

  // Logout function
  const logout = () => {
    // Clear stored user data
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    setUser(null);
    
    // Handle navigation with canisterId if present
    const canisterId = getCanisterId();
    if (canisterId) {
      navigate(`/?canisterId=${canisterId}`);
    } else {
      navigate('/');
    }
  };

  // The value passed to the provider includes user data, loading state, and auth functions
  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;