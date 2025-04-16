import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';
import AOS from 'aos';

const ContactPage = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}> {/* Add padding to account for the fixed navbar */}
      <Contact />
    </div>
  );
};

export default ContactPage;