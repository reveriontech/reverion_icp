import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    message: '',
    isSuccess: false,
    isSubmitting: false
  });
  
  // Animation controls for scroll reveal
  const controls = useAnimation();
  
  useEffect(() => {
    // Start animations when component mounts
    controls.start("visible");
  }, [controls]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        message: 'Please fill all required fields.',
        isSuccess: false,
        isSubmitting: false
      });
      return;
    }
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({
        message: 'Thank you! Your message has been sent successfully.',
        isSuccess: true,
        isSubmitting: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        message: 'Oops! Something went wrong. Please try again later.',
        isSuccess: false,
        isSubmitting: false
      });
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };

  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0", minHeight: "60vh"}} id="contact">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6">
            <motion.div initial="hidden" animate={controls} variants={containerVariants} className="pe-lg-4" viewport={{ once: true, amount: 0.3 }}>
              <motion.h2 variants={itemVariants} className="mb-4"
                style={{ fontSize: '42px', 
                  fontWeight: '700', 
                  color: '#333'
                }}
              >
                We Love Talking To Visionaries Like You.
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="mb-4"
                style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.7'
                }}
              >
                If you have an idea in mind, feel free to reach out by submitting the form below to schedule a discovery call with us.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="mb-5"
                style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.7'
                }}
              >
                We're pulling all the stops to make sure your brand gets noticed in this app-driven world. Whether you're looking to develop an e-commerce app or a product application with bluetooth connectivity, we got you covered.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="contact-info mb-3"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <h5 style={{ fontWeight: '600', color: '#333' }}>
                  <FaMapMarkerAlt size={18} style={{ color: '#faa307', marginRight: '10px' }} />
                    Production Office: Davao City Philippines
                </h5>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="contact-info mb-3"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <h5 style={{ fontWeight: '600', color: '#333' }}>
                  <FaPhone size={18} style={{ color: '#faa307', marginRight: '10px' }} />
                  +63-82-2820645
                </h5>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="contact-info mb-5"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <h5 style={{ fontWeight: '600', color: '#333' }}>
                  <FaEnvelope size={18} style={{ color: '#faa307', marginRight: '10px' }} />
                  reveriontech@gmail.com
                </h5>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="col-lg-6">
            <motion.div 
              className="card border-0 shadow"
              initial="hidden"
              animate={controls}
              variants={formVariants}
              viewport={{ once: true, amount: 0.3 }}
              style={{
                borderRadius: '15px',
                padding: '35px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                marginTop: '10px'
              }}
            >
              {formStatus.message && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`alert ${formStatus.isSuccess ? 'alert-success' : 'alert-danger'} mb-4`}
                  style={{ fontSize: '14px' }}
                >
                  {formStatus.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit}>
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <label htmlFor="name" className="form-label" style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{ 
                      padding: '12px 15px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                    }}
                  />
                </motion.div>
                
                <div className="row mb-4">
                  <motion.div 
                    className="col-md-6"
                    variants={itemVariants}
                  >
                    <label htmlFor="email" className="form-label" style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      style={{ 
                        padding: '12px 15px',
                        fontSize: '14px',
                        borderRadius: '8px',
                        border: '1px solid #eee',
                      }}
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="col-md-6"
                    variants={itemVariants}
                  >
                    <label htmlFor="phone" className="form-label" style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: '#f8f9fa', border: '1px solid #eee', borderRadius: '8px 0 0 8px' }}>+1</span>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        style={{ 
                          padding: '12px 15px',
                          fontSize: '14px',
                          borderRadius: '0 8px 8px 0',
                          border: '1px solid #eee',
                          borderLeft: 'none'
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <label htmlFor="message" className="form-label" style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>Message</label>
                  <textarea 
                    className="form-control" 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write Message"
                    style={{ 
                      padding: '12px 15px',
                      fontSize: '14px',
                      borderRadius: '8px',
                      border: '1px solid #eee',
                      resize: 'none'
                    }}
                  ></textarea>
                </motion.div>
                
                <motion.div 
                  className="mb-4"
                  variants={itemVariants}
                >
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" style={{ backgroundColor: '#faa307', borderColor: '#faa307' }} />
                    <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: '14px', color: '#666', marginLeft: '5px' }}>
                      Remember me
                    </label>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="d-grid"
                  variants={itemVariants}
                >
                  <motion.button 
                    type="submit"
                    className="btn btn-lg"
                    disabled={formStatus.isSubmitting}
                    style={{ 
                      backgroundColor: '#faa307',
                      color: '#fff',
                      border: 'none',
                      padding: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderRadius: '8px',
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: '#f99500',
                      boxShadow: '0 4px 10px rgba(250, 163, 7, 0.3)' 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {formStatus.isSubmitting ? 'Sending...' : 'Submit'}
                    {!formStatus.isSubmitting && (
                      <FaPaperPlane size={14} style={{ marginLeft: '8px' }} />
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;