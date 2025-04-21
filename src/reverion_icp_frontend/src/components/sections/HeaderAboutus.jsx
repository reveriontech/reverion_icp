import React from 'react';
import { motion } from 'framer-motion';

const HeaderContact = () => {
  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
    
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="position-relative w-100 d-flex flex-column align-items-center justify-content-center overflow-hidden"
      style={{
        height: '40%', 
        minHeight: '350px',
        background: 'linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)), url("/images/landpict2.jpg") no-repeat center center',
        backgroundSize: 'cover',
        position: 'relative',
        marginTop: '-23px',  
        paddingTop: '70px'
      }}
    >
      {/* Dark glow effect in the center with animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="position-absolute" 
        style={{ 
          width: '350px',
          height: '350px', 
          backgroundColor: '#212325', 
          borderRadius: '50%',
          filter: 'blur(120px)', 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '0'
        }}
      ></motion.div>
      
      {/* Main content with improved spacing and typography */}
      <div className="container text-center position-relative" style={{ zIndex: '1' }}>
        <motion.h1 
          variants={itemVariants}
          className="text-white mb-3 display-3" 
          style={{ 
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontWeight: '700'
          }}
        >
          About Us
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-white text-center mx-auto px-4" 
          style={{ 
            maxWidth: '800px',
            fontSize: '1.15rem',
            lineHeight: '1.6',
            opacity: '0.9',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          Providing comprehensive and tailored technology solutions to address your unique business challenges and achieve optimal results at ReverionTech.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default HeaderContact;