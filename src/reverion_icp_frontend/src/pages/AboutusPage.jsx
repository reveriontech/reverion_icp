import React, { useEffect } from 'react';
import AOS from 'aos';
import About from '../components/sections/About';
import HeaderAboutus from '../components/sections/HeaderAboutus';

const AboutusPage = () => {
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
    <div style={{ paddingTop: '80px' }}>
      <HeaderAboutus />
      <About />
    </div>
  );
};

export default AboutusPage;