import React, { useEffect } from 'react';
import AOS from 'aos';
import Contact from '../components/sections/Contact';
import HeaderContact from '../components/sections/HeaderContact';
import SecondCta from '../components/sections/SecondCta';

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
    <div  style={{ paddingTop: '80px' }}>
      <HeaderContact />
      <Contact />
    </div>
  );
};

export default ContactPage;