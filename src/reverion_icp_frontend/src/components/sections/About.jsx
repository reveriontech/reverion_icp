import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaRocket, FaGlobe } from 'react-icons/fa';
import { color } from 'chart.js/helpers';

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className="py-5"  style={{backgroundColor: "white",}} id="about">
      <div className="container">
        <motion.div
          className="row justify-content-between align-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Column - Text Content */}
          <div className="col-lg-6">
            <motion.div variants={itemVariants}>
              <h3 className="mb-4">Why Choose Reverion Tech</h3>
            </motion.div>

            <motion.div className="d-flex mb-4" variants={itemVariants}>
              <div className="me-3">
                <div className="d-flex justify-content-center align-items-center rounded-circle" 
                     style={{ width: '45px', height: '45px', backgroundColor: '#5271ff' }}>
                  <FaHandshake className="text-white" size={20} />
                </div>
              </div>
              <div>
                <p className="mb-0">
                  When you partner with us, you gain more than a service provider—you 
                  gain a dedicated technology ally committed to your success.
                </p>
              </div>
            </motion.div>

            <motion.div className="d-flex mb-4" variants={itemVariants}>
              <div className="me-3">
                <div className="d-flex justify-content-center align-items-center rounded-circle" 
                     style={{ width: '45px', height: '45px', backgroundColor: '#ff5c7c' }}>
                  <FaRocket className="text-white" size={20} />
                </div>
              </div>
              <div>
                <p className="mb-0">
                  Our blend of technical excellence, industry knowledge, and client-focused 
                  approach has helped hundreds of organizations achieve their digital ambitions.
                </p>
              </div>
            </motion.div>

            <motion.div className="d-flex mb-4" variants={itemVariants}>
              <div className="me-3">
                <div className="d-flex justify-content-center align-items-center rounded-circle" 
                     style={{ width: '45px', height: '45px', backgroundColor: '#4caf50' }}>
                  <FaGlobe className="text-white" size={20} />
                </div>
              </div>
              <div>
                <p className="mb-0">
                  Our roots in the Philippines give us a unique perspective and enable us 
                  to deliver premium solutions with exceptional value. We combine global 
                  best practices with local insights to create technology that resonates 
                  with users worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div className="mt-5" variants={itemVariants}>
              <h3 className="h4 mb-3">Let's Build Something Amazing Together</h3>
              <p className="mb-4">
                Whether you're looking to harness the power of blockchain, implement AI-driven 
                solutions, or transform your data into actionable insights, Reverion Tech has 
                the expertise, experience, and enthusiasm to make it happen.
              </p>
              <div className="d-flex gap-3 buttonContainer">
                <motion.a 
                  href="https://calendly.com/reveriontech?package=${plan.name}"
                  className="btn btn-primary"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Book Us A Call
                </motion.a>
                <motion.a 
                  href="#offer"
                  className="btn btn-outline-secondary"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Services
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <div className="col-lg-5 img-container">
            <motion.div 
              className="position-relative rounded overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team Collaboration" 
                className="img-fluid rounded shadow"
              />
              <div className="position-absolute top-0 left-0 w-100 h-100 rounded" 
                   style={{ background: 'linear-gradient(135deg, rgba(82, 113, 255, 0.6) 0%, rgba(255, 92, 124, 0.6) 100%)' }}>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white">
                <div className="p-3 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <h4 className="h5 mb-2">Start Your Digital Transformation</h4>
                  <p className="small mb-0">Book a call us today to begin your journey</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;