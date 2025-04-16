import React from 'react';

const HeaderContact = () => {
  return (
    <div 
      className="position-relative w-100 d-flex flex-column align-items-center justify-content-center overflow-hidden"
      style={{
        height: '40%', 
        minHeight: '350px', // Increased minimum height for better presentation
        background: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url("/images/landpict2.jpg") no-repeat center center',
        backgroundSize: 'cover',
        position: 'relative',
        marginTop: '-10px',  
        paddingTop: '70px' // Increased padding for better spacing
      }}
    >
      {/* Dark glow effect in the center */}
      <div className="position-absolute" 
        style={{ 
          width: '350px', // Slightly larger glow
          height: '350px', 
          backgroundColor: '#212325', 
          borderRadius: '50%',
          filter: 'blur(120px)', // Increased blur for softer effect
          opacity: '0.4', // Slightly increased opacity
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '0'
        }}
      ></div>
      
      {/* Main content with improved spacing and typography */}
      <div className="container text-center position-relative" style={{ zIndex: '1' }}>
        <h1 className="text-white fw-bold mb-3 display-3" style={{ 
          letterSpacing: '0.5px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>Our Work</h1>
        
        <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#FCD581', marginBottom: '25px' }}></div>
        
        <p className="text-white text-center mx-auto px-4" style={{ 
          maxWidth: '800px',
          fontSize: '1.15rem',
          lineHeight: '1.6',
          opacity: '0.9',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
        }}>
          Providing Comprehensive and Tailored Solutions to Address Your Unique 
          Business Challenges and Achieve Optimal Results.
        </p>
      </div>
    </div>
  );
};

export default HeaderContact;