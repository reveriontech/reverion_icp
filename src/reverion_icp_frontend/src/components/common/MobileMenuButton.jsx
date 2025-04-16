import React from 'react';

/**
 * Mobile menu button component that appears on screens up to 1920px
 * to toggle the sidebar visibility
 */
const MobileMenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className="mobile-menu-toggle d-xxl-none"
      onClick={toggleMenu}
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      aria-expanded={isOpen}
    >
      <i className={`bi ${isOpen ? 'bi-layout-sidebar-inset-reverse' : 'bi-layout-sidebar-inset'}`}></i>
    </button>
  );
};

export default MobileMenuButton