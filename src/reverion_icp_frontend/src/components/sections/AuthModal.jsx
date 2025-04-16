import React, { useState, useEffect } from 'react';
import { FaTimes, FaEnvelope, FaLock, FaUser, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import AuthFunctions from '../../assets/functions/AuthFunctions';

// Login and Signup Modal Component
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const {
        navigate,
        isGoogleSigningUp,
        setIsGoogleSigningUp,
        handleGoogleSignUp,
        errors
  } = AuthFunctions()
  
  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setName('');
        setRememberMe(false);
      }, 300); // Wait for the close animation
    }
  }, [isOpen]);
  
  // Set initial mode when modal opens
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a user object with the form data
    const userData = {
      email,
      name: mode === 'signup' ? name : email.split('@')[0], // Use name if provided, or extract from email
      loggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    // Use the login function from auth context
    login(userData, rememberMe);
    
    console.log(mode === 'login' ? 'Login successful' : 'Signup successful', userData);
    
    // Close modal after form submission
    onClose();
  };
  
  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };
  
  const handleSocialLogin = (provider) => {
    // Create a user object for social login
    const userData = {
      email: `user@${provider.toLowerCase()}.com`,
      name: `${provider} User`,
      loggedIn: true,
      loginTime: new Date().toISOString(),
      provider
    };
    
    // Use the login function from auth context (social logins usually "remember" the user)
    login(userData, true);
    
    console.log(`Login with ${provider} successful`, userData);
    
    // Close modal
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="auth-modal-overlay">
      <div className={`auth-modal ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        
        <div className="auth-form-container">
          <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
          
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="form-group">
                <label>
                  <FaUser className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </label>
              </div>
            )}
            
            <div className="form-group">
              <label>
                <FaEnvelope className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </label>
            </div>
            
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </label>
            </div>
            
            {mode === 'login' && (
              <div className="form-options">
                <label className="remember-me">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot-password" className="forgot-password" onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>
            )}
            
            <button type="submit" className="submit-button">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div className="social-login">
            <p>Or sign in using</p>
            <div className="social-buttons">
              <button 
                type="button"
                className="social-button facebook"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <FaFacebookF />
              </button>
              <button 
                type="button"
                className="social-button twitter"
                onClick={() => handleSocialLogin('Twitter')}
              >
                <FaTwitter />
              </button>
              <button 
                type="button"
                className="social-button google"
                onClick={handleGoogleSignUp}
              >
                <FaGoogle />
              </button>
            </div>
          </div>
          
          <div className="switch-mode">
            {mode === 'login' ? (
              <p>Don't have an account? <button type="button" onClick={switchMode}>Sign up</button></p>
            ) : (
              <p>Already have an account? <button type="button" onClick={switchMode}>Login</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;