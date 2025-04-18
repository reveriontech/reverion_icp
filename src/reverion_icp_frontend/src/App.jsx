import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import { useAuth } from './context/AuthContext';
import { useResponsiveNavigation } from './utils/responsive-utils'; 

// Import pages
import Home from './pages/Home';
import Portal from './pages/Portal';
import ContactPage from './pages/ContactPage'; 

// Import layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Team from './components/sections/Team';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import ChatWidget from './components/sections/ChatWidget';
import MobileMenuButton from './components/common/MobileMenuButton'; 
import Partners from './components/sections/Partners';
import HeaderContact from './components/sections/HeaderContact';

function App() {
  const { user } = useAuth(); // Get authentication status
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useResponsiveNavigation(); // Get responsive navigation state

  // Check if the current location contains "portal" in the hash part
  // This is important for IC environment which may use hash routing
  const isPortalRoute = 
    location.pathname.includes('/portal') || 
    (location.hash && location.hash.includes('/portal'));

  useEffect(() => {
    console.log("Current location:", location);
    console.log("Is portal route:", isPortalRoute);
    console.log("User status:", user ? "Logged in" : "Not logged in");
    
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, [location, isPortalRoute, user]);
  
  if (user && (isPortalRoute || location.pathname === '/')) {
    return (
      <>
        <MobileMenuButton isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
        <Portal />
      </>
    );
  }

  // If no user but trying to access portal, redirect to home
  if (!user && isPortalRoute) {
    // Preserve any query parameters like canisterId
    return <Navigate to={`/${location.search}`} replace />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/headercontact" element={<HeaderContact to="/" />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <ChatWidget />
    </>
  );
}

export default App;