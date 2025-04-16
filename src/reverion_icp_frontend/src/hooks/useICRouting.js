import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A custom hook to handle routing in Internet Computer environment
 * which often uses hash-based routes with canister IDs
 */
const useICRouting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract canister ID from URL if present
  const getCanisterId = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('canisterId');
  }, []);
  
  // Check if we're in an IC environment (has canisterId in URL)
  const isICEnvironment = useCallback(() => {
    return !!getCanisterId();
  }, [getCanisterId]);
  
  // Build a URL that works in both regular and IC environments
  const buildPath = useCallback((path) => {
    const canisterId = getCanisterId();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    if (canisterId) {
      // For Internet Computer environment, use hash routing
      return `/?canisterId=${canisterId}#${cleanPath}`;
    }
    
    return cleanPath;
  }, [getCanisterId]);
  
  // Navigate while preserving canister ID if present
  const navigateTo = useCallback((path) => {
    const targetPath = buildPath(path);
    navigate(targetPath);
  }, [navigate, buildPath]);
  
  // Check if a path is currently active
  const isActivePath = useCallback((path) => {
    // For hash routes in IC environment
    if (location.hash) {
      return location.hash.includes(path);
    }
    
    // For regular routes
    return location.pathname.includes(path);
  }, [location]);
  
  return {
    getCanisterId,
    isICEnvironment,
    buildPath,
    navigateTo,
    isActivePath
  };
};

export default useICRouting;