import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  // State to track expanded FAQ items
  const [expandedId, setExpandedId] = useState(null);
  
  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "How quickly can I expect a response?",
      answer: "We typically respond to all inquiries within 24 business hours. For urgent matters, please call our support line directly."
    },
    {
      id: 2,
      question: "Do you offer technical support on weekends?",
      answer: "Yes, our technical support team is available on Saturdays from 10AM to 2PM. For emergencies, premium support plans include 24/7 assistance."
    },
    {
      id: 3,
      question: "Can I schedule a consultation before committing to services?",
      answer: "Absolutely! We offer a free 30-minute consultation to discuss your needs and how ReverionTech can help. Use our contact form to schedule."
    },
    {
      id: 4,
      question: "What information should I include in my message?",
      answer: "To help us serve you better, please include details about your project, timeline requirements, and any specific technologies you're interested in."
    }
  ];

  // Toggle expanded item
  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 90
      }
    }
  };

  const backgroundGradient = "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)";
  const accentColor = "#ff9800"; // Warmer orange accent

  return (
    <section className="section py-5" id="faq" style={{ 
      background: backgroundGradient,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,152,0,0.1) 0%, rgba(255,152,0,0) 70%)",
        top: "-100px",
        right: "-100px",
        zIndex: 0
      }}/>
      <div style={{
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,152,0,0.08) 0%, rgba(255,152,0,0) 70%)",
        bottom: "50px",
        left: "10%",
        zIndex: 0
      }}/>

      <div className="container position-relative">
        {/* Section header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="badge text-uppercase fw-medium px-3 py-2 mb-2" style={{
            background: `${accentColor}20`, // 20% opacity
            color: accentColor,
            borderRadius: "30px",
            fontSize: "0.7rem",
            letterSpacing: "1px"
          }}>FAQ</span>
          <h3 className="fw-bold mb-2">Frequently Asked Questions</h3>
          <p className="text-muted mx-auto small" style={{ maxWidth: "500px" }}>
            Find answers to common questions about our services and support options
          </p>
        </motion.div>

        {/* FAQ Items Container */}
        <motion.div 
          className="row justify-content-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="col-lg-9">
            <div className="faq-container">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`faq-item mb-4`}
                >
                  <motion.div 
                    className="faq-question p-3 position-relative"
                    onClick={() => toggleExpanded(item.id)}
                    whileHover={{ 
                      backgroundColor: "#ffffff",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
                      y: -2
                    }}
                    style={{ 
                      backgroundColor: expandedId === item.id ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: expandedId === item.id ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.8)",
                      boxShadow: expandedId === item.id ? "0 10px 25px rgba(0, 0, 0, 0.06)" : "0 4px 6px rgba(0, 0, 0, 0.02)",
                      backdropFilter: "blur(10px)",
                      zIndex: 1
                    }}
                  >
                    {/* Glowing border effect */}
                    <motion.div
                      className="position-absolute"
                      style={{
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        borderRadius: "14px",
                        background: `linear-gradient(90deg, ${accentColor}00, ${accentColor}80, ${accentColor}00)`,
                        backgroundSize: "200% 100%",
                        zIndex: -1,
                        opacity: 0,
                        pointerEvents: "none"
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 1,
                        backgroundPosition: ["0% 0%", "100% 0%", "200% 0%"]
                      }}
                      transition={{
                        backgroundPosition: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        },
                        opacity: { duration: 0.2 }
                      }}
                    />
                    
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <motion.div
                          animate={{ 
                            backgroundColor: expandedId === item.id ? accentColor : "rgba(255, 255, 255, 0.9)",
                            color: expandedId === item.id ? "#ffffff" : "#495057",
                            border: expandedId === item.id ? `1px solid ${accentColor}` : "1px solid rgba(0,0,0,0.08)"
                          }}
                          className="d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                          style={{ 
                            width: "28px", 
                            height: "28px", 
                            borderRadius: "8px",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <span className="fw-bold" style={{ fontSize: "12px" }}>{item.id}</span>
                        </motion.div>
                        <h6 className="mb-0 fw-semibold">{item.question}</h6>
                      </div>
                      <motion.div
                        animate={{ 
                          rotate: expandedId === item.id ? 45 : 0,
                          backgroundColor: expandedId === item.id ? `${accentColor}20` : "transparent",
                        }}
                        className="ms-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ 
                          width: "28px", 
                          height: "28px", 
                          borderRadius: "50%",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <span style={{ 
                          fontSize: "1.2rem", 
                          lineHeight: 1, 
                          fontWeight: 300,
                          color: expandedId === item.id ? accentColor : "#6c757d"
                        }}>+</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        key={`answer-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: "auto",
                          opacity: 1,
                          transition: { 
                            height: { duration: 0.3 },
                            opacity: { duration: 0.3, delay: 0.1 }
                          }
                        }}
                        exit={{ 
                          height: 0,
                          opacity: 0,
                          transition: { 
                            height: { duration: 0.2 },
                            opacity: { duration: 0.1 }
                          }
                        }}
                        className="faq-answer overflow-hidden"
                      >
                        <div className="p-3 ms-4 ps-3" style={{ 
                          borderLeft: `3px solid ${accentColor}50`,
                          marginLeft: "17px",
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                          borderRadius: "0 0 12px 12px",
                          boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.02)"
                        }}>
                          <p className="mb-0 text-muted" style={{ fontSize: "14px", lineHeight: "1.5" }}>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            {/* Additional help section */}
            <motion.div 
            className="text-center mt-5 pt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >
            <motion.div 
                className="p-4 rounded-4 position-relative overflow-hidden"
                whileHover={{ 
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                y: -3
                }}
                transition={{ duration: 0.3 }}
                style={{
                background: "linear-gradient(120deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))",
                border: "1px solid rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)"
                }}
            >
                {/* Decorative elements */}
                <div className="position-absolute" style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accentColor}15 0%, ${accentColor}00 70%)`,
                top: "-20px",
                right: "-20px",
                zIndex: 0
                }}/>
                <div className="position-absolute" style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${accentColor}10 0%, ${accentColor}00 70%)`,
                bottom: "10px",
                left: "15%",
                zIndex: 0
                }}/>
                
                <div className="row align-items-center justify-content-between position-relative">
                <div className="col-md-7 text-md-start text-center mb-md-0 mb-3">
                    <h5 className="fw-bold mb-2" style={{ color: "#424242" }}>
                    <motion.span 
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="d-inline-block"
                    >
                        Ready to Start Your Project?
                    </motion.span>
                    </h5>
                    <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
                    Our team is ready to help you find the perfect solution for your business needs
                    </p>
                </div>
                <div className="col-md-5 text-md-end text-center d-flex justify-content-md-end justify-content-center">
                    <motion.button 
                    className="btn px-4 py-2 fw-medium position-relative overflow-hidden"
                    whileHover={{ 
                        scale: 1.03,
                        boxShadow: `0 6px 20px ${accentColor}40`
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        backgroundColor: accentColor,
                        color: "white",
                        borderRadius: "10px",
                        boxShadow: `0 4px 12px ${accentColor}30`,
                        border: "none",
                        zIndex: 1
                    }}
                    >
                    {/* Button shine effect */}
                    <motion.div
                        className="position-absolute"
                        initial={{ x: "-100%", opacity: 0.7 }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                        zIndex: -1
                        }}
                    />
                    <span className="d-flex align-items-center">
                        <a className="me-2" href="https://forms.clickup.com/9016503780/p/f/8cptvf4-496/BTYBZQ6D05CPYSPJKU/project-intake-form" target="_blank" rel="noopener noreferrer">
                         <span className="me-2" style={{color:"white"}}>Start your project</span>
                        </a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </span>
                    </motion.button>
                </div>
                </div>
            </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;