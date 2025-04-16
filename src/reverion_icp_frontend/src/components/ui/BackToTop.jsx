import React, { useState, useEffect } from 'react';
import { scrollToTop } from '../utils/scrollUtils';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show/hide button based on scroll position
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  return (
    <a 
      href="#" 
      className={`back-to-top rounded d-inline-block text-center ${isVisible ? 'active' : ''}`} 
      id="back-to-top"
      onClick={scrollToTop}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <i className="mdi mdi-chevron-up d-block"></i>
    </a>
  );
};

export default BackToTop;