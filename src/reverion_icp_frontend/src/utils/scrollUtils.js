/**
 * Utility functions for smooth scrolling
 */

/**
 * Smoothly scrolls to a section by ID with offset for navbar
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {Event} e - The event object
 * @param {number} offset - Offset in pixels (default: 80px)
 */
export const scrollToSection = (sectionId, e, offset = 80) => {
    if (e) {
      e.preventDefault();
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  /**
   * Scroll to top of the page
   * @param {Event} e - The event object
   */
  export const scrollToTop = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  export default {
    scrollToSection,
    scrollToTop
  };