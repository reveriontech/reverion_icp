import React, { useEffect } from 'react';
import AOS from 'aos';
import $ from 'jquery';

// Import section components
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Cta from '../components/sections/Cta';
import Team from '../components/sections/Team';
import SecondCta from '../components/sections/SecondCta';
import Pricing from '../components/sections/Pricing';
import Partners from '../components/sections/Partners';
import Contact from '../components/sections/Contact';
import StartProject from '../components/sections/StartProject';
import FAQ from '../components/sections/FAQ';

const Home = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Back to top button functionality
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn();
      } else {
        $('.back-to-top').fadeOut();
      }
    });
    
    $('.back-to-top').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 800);
    });

    // Clean up
    return () => {
      $(window).off('scroll');
      $('.back-to-top').off('click');
    };
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Cta />
      <Team />
      <SecondCta />
      <Pricing />
      <StartProject />
      <Partners />
      <FAQ />
      <Contact />
    </main>
  );
};

export default Home;