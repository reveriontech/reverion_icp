import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Partners = () => {
  const sliderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [carouselError, setCarouselError] = useState(false);
  
  // Memoized partner data to prevent recreation on each render
  const partners = [
    { id: 1, src: "/images/partnerlogo/dct.png", alt: "DCT", name: "Lungsod ng Dabaw" },
    { id: 2, src: "/images/partnerlogo/icp-ph.png", alt: "ICP-PH", name: "ICP Philippines" },
    { id: 3, src: "/images/partnerlogo/nftdavao.png", alt: "NFT Davao", name: "NFT Davao" },
    { id: 4, src: "/images/partnerlogo/rerdao.png", alt: "RERDAO", name: "RER DAO" }
  ];

  // Extracted initSlider logic for better code organization
  const initSlider = useCallback(() => {
    if (!sliderRef.current || !window.jQuery || !window.jQuery.fn.slick) {
      setCarouselError(true);
      return;
    }
    
    try {
      const $slider = window.jQuery(sliderRef.current);
      
      // Check if already initialized to prevent duplicate initialization
      if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick');
      }
      
      $slider.slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            }
          }
        ],
        accessibility: true, // Enhance keyboard navigation
        prevArrow: '<button type="button" class="slick-prev" aria-label="Previous">Previous</button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Next">Next</button>'
      });
      
      setCarouselError(false);
    } catch (error) {
      console.error("Error initializing slick carousel:", error);
      setCarouselError(true);
    }
  }, []);
  
  useEffect(() => {
    // Set component as visible for entrance animations
    setIsVisible(true);
    
    // Initialize the carousel after a short delay
    const timer = setTimeout(() => {
      initSlider();
    }, 150);
    
    // Check for DOM changes that might affect the carousel
    const resizeObserver = new ResizeObserver(() => {
      if (sliderRef.current) {
        initSlider();
      }
    });
    
    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }
    
    // Clean up
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      
      if (sliderRef.current && window.jQuery && window.jQuery.fn.slick) {
        try {
          const $slider = window.jQuery(sliderRef.current);
          if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
          }
        } catch (e) {
          // Silent catch
        }
      }
    };
  }, [initSlider]);

  // Framer Motion variants - organized and separated by component
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3
        }
      }
    },
    title: {
      hidden: { y: -20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: 0.1
        }
      }
    },
    divider: {
      hidden: { width: 0, opacity: 0 },
      visible: { 
        width: "80px", 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 200, 
          damping: 40,
          delay: 0.3
        }
      }
    },
    subtitle: {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.5
        }
      }
    },
    button: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { 
        scale: 1, 
        opacity: 1,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 10,
          delay: 0.7
        }
      },
      hover: { 
        scale: 1.05,
        backgroundColor: "#fbc44f",
        boxShadow: "0 6px 20px rgba(251, 196, 79, 0.4)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      tap: { 
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }
    },
    card: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      hover: {
        y: -8,
        boxShadow: "0 14px 28px rgba(251, 196, 79, 0.2), 0 10px 10px rgba(251, 196, 79, 0.15)",
        borderColor: "#fbc44f",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }
    },
    image: {
      hover: {
        scale: 1.05,
        filter: "grayscale(0%) drop-shadow(0 0 3px rgba(251, 196, 79, 0.5))",
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }
    },
    text: {
      hover: {
        opacity: 1,
        y: -2,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }
    },
    overlay: {
      initial: { opacity: 0 },
      hover: {
        opacity: 1,
        transition: { duration: 0.2 }
      }
    },
    bubbles: (index) => ({
      animate: {
        y: [0, -30, 0],
        x: [0, (Math.random() * 20) - 10, 0],
        opacity: [0.1, 0.3, 0.1]
      },
      transition: {
        duration: 5 + Math.random() * 5,
        repeat: Infinity,
        delay: index * 0.5,
        ease: "easeInOut"
      }
    })
  };

  // Style object for better organization
  const styles = {
    section: {
      background: "white",
      overflow: "hidden",
      position: "relative"
    },
    title: { 
      fontWeight: "700", 
      color: "#2d3748" 
    },
    divider: { 
      height: "4px", 
      backgroundColor: "#3d5afe", 
      borderRadius: "2px" 
    },
    subtitle: { 
      maxWidth: "600px", 
      margin: "0 auto" 
    },
    card: {
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      cursor: "pointer",
      border: "1px solid rgba(0,0,0,0.05)",
      overflow: "hidden",
      position: "relative",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem 1rem"
    },
    logo: {
      maxHeight: "100px", 
      maxWidth: "80%",
      filter: "grayscale(30%)",
      transition: "all 0.3s ease"
    },
    partnerName: { 
      fontSize: "16px", 
      fontWeight: "500",
      opacity: 0.7,
      marginTop: "1rem"
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(to top, rgba(251, 196, 79, 0.1), rgba(255, 255, 255, 0) 50%)",
      borderRadius: "12px",
      pointerEvents: "none"
    },
    buttonStyle: { 
      backgroundColor: "#3d5afe", 
      color: "white",
      borderRadius: "30px",
      padding: "12px 32px",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(61, 90, 254, 0.2)",
      border: "none",
      position: "relative",
      overflow: "hidden"
    },
    buttonGlow: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(circle, rgba(251, 196, 79, 0.3) 0%, rgba(251, 196, 79, 0) 70%)",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none"
    },
    bubbleContainer: {
      position: "absolute", 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      overflow: "hidden", 
      pointerEvents: "none"
    },
    bubble: (index) => ({
      position: "absolute",
      width: `${20 + Math.random() * 30}px`,
      height: `${20 + Math.random() * 30}px`,
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(61, 90, 254, 0.1), rgba(61, 90, 254, 0.05))",
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      zIndex: -1
    }),
    errorMessage: {
      color: "#e53e3e",
      textAlign: "center",
      padding: "1rem",
      marginBottom: "1rem",
      backgroundColor: "rgba(254, 215, 215, 0.2)",
      borderRadius: "8px",
      border: "1px solid rgba(254, 215, 215, 0.5)"
    },
    fallbackGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1.5rem"
    }
  };
  
  return (
    <section className="partners-section py-5" id='partners' style={styles.section}>
      <div className="container">
        <motion.div 
          className="row mb-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.container}
        >
          <div className="col-12 text-center">
            <motion.h2 
              className="section-title mb-2"
              variants={animations.title}
              style={styles.title}
            >
              Our Trusted Partners
            </motion.h2>
            
            <motion.div 
              className="section-divider mx-auto mb-3" 
              style={styles.divider}
              variants={animations.divider}
            ></motion.div>
            
            <motion.p 
              className="text-muted"
              variants={animations.subtitle}
              style={styles.subtitle}
            >
              Collaborating with industry leaders to build the future of digital innovation
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div 
          className="row" 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.container}
        >
          <div className="col-12">
            {carouselError && (
              <div style={styles.errorMessage}>
                <p>Unable to initialize partner carousel. Displaying partners in grid view.</p>
              </div>
            )}
            
            {carouselError ? (
              // Fallback grid display when slick fails
              <div style={styles.fallbackGrid}>
                {partners.map((partner) => (
                  <PartnerCard 
                    key={partner.id} 
                    partner={partner} 
                    animations={animations} 
                    styles={styles} 
                  />
                ))}
              </div>
            ) : (
              // Slick carousel
              <div className="partner-slider px-3" ref={sliderRef} aria-label="Partner companies">
                {partners.map((partner) => (
                  <div key={partner.id} className="px-3 py-2">
                    <PartnerCard 
                      partner={partner} 
                      animations={animations} 
                      styles={styles} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="row mt-5"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={animations.container}
        >
          <div className="col-12 text-center">
            <motion.button 
              className="btn"
              variants={animations.button}
              whileHover="hover"
              whileTap="tap"
              style={styles.buttonStyle}
              aria-label="Become a partner"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                Become a Partner
              </motion.span>
              
              <motion.span
                style={styles.buttonGlow}
                initial={{ opacity: 0 }}
                whileHover={{
                  opacity: 1,
                  scale: 2,
                  transition: { duration: 0.5 }
                }}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Background Animation Elements */}
      <div style={styles.bubbleContainer}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.bubble(i)}
            animate={animations.bubbles(i).animate}
            transition={animations.bubbles(i).transition}
          />
        ))}
      </div>
    </section>
  );
};

// Extracted reusable component for partner cards
const PartnerCard = ({ partner, animations, styles }) => {
  return (
    <motion.div 
      className="partner-card text-center h-100" 
      initial={animations.card.initial}
      animate={animations.card.animate}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: partner.id * 0.1
      }}
      whileHover="hover"
      variants={animations.card}
      style={styles.card}
    >
      <motion.div
        className="partner-logo-wrapper"
        variants={animations.image}
      >
        <img 
          src={partner.src} 
          className="img-fluid mx-auto d-block" 
          alt={partner.alt} 
          style={styles.logo}
          loading="lazy"
        />
      </motion.div>
      
      <motion.h5 
        className="partner-name mb-0" 
        variants={animations.text}
        style={styles.partnerName}
      >
        {partner.name}
      </motion.h5>
      
      <motion.div
        className="partner-overlay"
        initial={animations.overlay.initial}
        variants={animations.overlay}
        style={styles.overlay}
      />
    </motion.div>
  );
};

export default React.memo(Partners);
