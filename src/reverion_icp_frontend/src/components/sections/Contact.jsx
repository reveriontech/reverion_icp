import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaUser } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    message: '',
    isSuccess: false,
    isSubmitting: false
  });
  
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const contactItems = [
    {
      icon: <FaMapMarkerAlt size={35} />,
      title: "OUR MAIN OFFICE",
      content: "SoHo 94 Broadway St\nNew York, NY 10001"
    },
    {
      icon: <FaPhone size={35} />,
      title: "PHONE NUMBER",
      content: "234-9876-5400\n888-0123-4567 (Toll Free)"
    },
    {
      icon: <FaEnvelope size={35} />,
      title: "EMAIL",
      content: "hello@theme.com"
    }
  ];
  
  return (
    <section style={{ 
      backgroundColor: "#ffffff", 
      padding: "60px 0 30px",
      minHeight: "90vh"
    }} id="contact">
      <motion.div 
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ maxWidth: "1300px" }}
      >
        <motion.div variants={itemVariants} className="text-center mb-5">
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '700', 
            color: '#333', 
            marginBottom: '10px',
            position: 'relative',
            display: 'inline-block',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            CONTACT US
            <div style={{ 
              height: '6px', 
              width: '100%', 
              background: '#faa307', 
              position: 'absolute',
              bottom: '-12px',
              left: '0',
              boxShadow: '0 3px 8px rgba(250, 163, 7, 0.3)'
            }}></div>
          </h2>
          <p style={{ 
            maxWidth: '900px', 
            margin: '30px auto 25px', 
            color: '#666',
            fontSize: '20px',
            lineHeight: '1.7'
          }}>
            We're here to help and answer any questions you might have. We look forward to hearing from you!
          </p>
        </motion.div>

        <div className="row justify-content-center" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="col-lg-5" style={{ paddingRight: '25px' }}>
            <div className="row">
              {contactItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="col-md-12 mb-5"
                  variants={itemVariants}
                >
                  <div 
                    style={{ 
                      background: '#fff', 
                      borderRadius: '10px', 
                      padding: '30px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.06), 0 4px 12px rgba(250, 163, 7, 0.08)',
                      border: '1px solid #f5f5f5',
                      transition: 'all 0.3s ease',
                      transform: 'scale(0.9)'
                    }}
                  >
                    <motion.div 
                      style={{ 
                        color: '#fff', 
                        backgroundColor: '#faa307',
                        width: '85px',
                        height: '85px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '25px',
                        boxShadow: '0 6px 18px rgba(250, 163, 7, 0.3)'
                      }}
                      whileHover={{ scale: 0.9 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <h6 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        marginBottom: '10px', 
                        color: '#333',
                        textTransform: 'uppercase'
                      }}>
                        {item.title}
                      </h6>
                      <p style={{ 
                        margin: 0, 
                        color: '#666', 
                        whiteSpace: 'pre-line', 
                        fontSize: '17px',
                        lineHeight: '1.7'
                      }}>
                        {item.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="col-lg-7"
            variants={itemVariants}
            style={{ paddingLeft: '25px' }}
          >
            <motion.div 
              className="card border-0 p-5"
              style={{
                boxShadow: '0 10px 25px rgba(0,0,0,0.06), 0 8px 16px rgba(250, 163, 7, 0.09)',
                borderRadius: '10px',
                marginBottom: '20px',
                transform: 'scale(0.9)'
              }}
            >
              <div className="card-body p-2">
                <h3 style={{ 
                  fontSize: '28px', 
                  textAlign: 'center', 
                  marginBottom: '30px',
                  color: '#333',
                  position: 'relative',
                  fontWeight: '600'
                }}>
                  SEND A MESSAGE
                </h3>

                {formStatus.message && (
                  <motion.div 
                    className={`alert ${formStatus.isSuccess ? 'alert-success' : 'alert-danger'} mb-4`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '16px' }}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="input-group" style={{ boxShadow: '0 3px 8px rgba(250, 163, 7, 0.15)' }}>
                      <span className="input-group-text" style={{ background: '#faa307', border: 'none', padding: '0 18px' }}>
                        <FaUser className="text-white" size={18} />
                      </span>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                        style={{ 
                          padding: '16px 18px',
                          border: '1px solid #eee',
                          fontSize: '17px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="input-group" style={{ boxShadow: '0 3px 8px rgba(250, 163, 7, 0.15)' }}>
                      <span className="input-group-text" style={{ background: '#faa307', border: 'none', padding: '0 18px' }}>
                        <FaEnvelope className="text-white" size={18} />
                      </span>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter a valid email address"
                        style={{ 
                          padding: '16px 18px',
                          border: '1px solid #eee',
                          fontSize: '17px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <textarea 
                      name="message"
                      className="form-control"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows="5"
                      style={{ 
                        padding: '16px 18px',
                        border: '1px solid #eee',
                        fontSize: '17px',
                        resize: 'none',
                        boxShadow: '0 3px 8px rgba(250, 163, 7, 0.15)'
                      }}
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <motion.button 
                      type="submit"
                      className="btn"
                      disabled={formStatus.isSubmitting}
                      style={{ 
                        backgroundColor: '#faa307',
                        color: '#fff',
                        border: 'none',
                        padding: '14px 40px',
                        fontSize: '17px',
                        fontWeight: '600',
                        borderRadius: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 5px 15px rgba(250, 163, 7, 0.35)'
                      }}
                      whileHover={{ 
                        backgroundColor: '#f99500',
                        boxShadow: '0 7px 18px rgba(250, 163, 7, 0.45)' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        SUBMIT MESSAGE
                        <FaPaperPlane size={16} />
                      </div>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;