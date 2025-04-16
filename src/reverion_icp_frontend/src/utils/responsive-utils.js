/**
 * Responsive utility functions for the dashboard application
 */

import { useEffect, useState } from 'react';

/**
 * Hook to detect device screen size
 * @returns {Object} Object containing boolean flags for different screen sizes
 */
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 992,
    isDesktop: window.innerWidth >= 992,
    width: window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 992,
        isDesktop: window.innerWidth >= 992,
        width: window.innerWidth
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

/**
 * Hook to manage responsive navigation
 * @returns {Object} Object containing navigation state and handlers
 */
export const useResponsiveNavigation = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useScreenSize();

  // Close sidebar when switching to desktop view
  useEffect(() => {
    if (!isMobile && isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen]);

  // Handle clicking outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (
        sidebar && 
        mobileToggle && 
        !sidebar.contains(event.target) && 
        !mobileToggle.contains(event.target) &&
        isSidebarOpen
      ) {
        setSidebarOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, isSidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar: () => setSidebarOpen(false)
  };
};