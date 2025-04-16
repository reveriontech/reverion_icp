import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom CSS
import './assets/css/aos.css';
import './assets/css/materialdesignicons.min.css';
import './assets/css/slick.css';
import './assets/css/slick-theme.css';
import './assets/css/magnific-popup.css';
import './assets/css/style.css';
import './assets/css/service-styles.css';
import './assets/css/navbar-styles.css';

// Import Bootstrap JS and dependencies
import 'jquery/dist/jquery';
import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Set up jQuery globally
import $ from 'jquery';
window.jQuery = window.$ = $;

// Add this line
import 'slick-carousel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);