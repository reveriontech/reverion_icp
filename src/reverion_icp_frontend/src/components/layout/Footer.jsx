import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram, FaTwitter, FaChevronRight, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <footer className="footer py-5 bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <Link className="footer-logo text-white border p-2" to="/">REVERIONTECH</Link>
              <p className="text-foot mt-3">Shaping the future of decentralized technology</p>
              <div className="d-flex mt-4">
                <a href="#" className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}>
                  <FaFacebookF className="text-white" />
                </a>
                <a href="#" className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}>
                  <FaLinkedinIn className="text-white" />
                </a>
                <a href="#" className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}>
                  <FaYoutube className="text-white" />
                </a>
                <a href="#" className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}>
                  <FaInstagram className="text-white" />
                </a>
                <a href="#" className="me-3 d-flex align-items-center justify-content-center rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}>
                  <FaTwitter className="text-white" />
                </a>
              </div>
            </div>
            
            <div className="col-lg-2 col-md-3 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">LINKS</h4>
              <ul className="list-unstyled footer-list mt-4 mb-0">
                <li className="mb-2"><a href="#about" className="text-foot"><FaChevronRight className="me-2" /> Aboutus</a></li>
                <li className="mb-2"><a href="#offer" className="text-foot"><FaChevronRight className="me-2" /> Services</a></li>
                <li className="mb-2"><a href="#team" className="text-foot"><FaChevronRight className="me-2" /> Team</a></li>
                <li className="mb-2"><a href="#pricing" className="text-foot"><FaChevronRight className="me-2" /> Pricing</a></li>
              </ul>
            </div>
            
            <div className="col-lg-3 col-md-5 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">TAGS</h4>
              <div className="mt-4 d-flex flex-wrap gap-2">
                <a href="#" className="d-inline-block px-3 py-1 bg-secondary text-white">Waste2earn</a>
                <a href="#" className="d-inline-block px-3 py-1 bg-secondary text-white">RESPONSIVE</a>
                <a href="#" className="d-inline-block px-3 py-1 bg-secondary text-white">Peaq</a>
                <a href="#" className="d-inline-block px-3 py-1 bg-secondary text-white">SERVICES</a>
                <a href="#" className="d-inline-block px-3 py-1 bg-secondary text-white">PRICE</a>
              </div>
            </div>
            
            <div className="col-lg-3 col-md-4 mt-4 pt-2 mt-lg-0 pt-lg-0">
              <h4 className="text-light text-uppercase footer-head">BUSINESS HOURS</h4>
              <ul className="list-unstyled text-white-50 mt-4 mb-0">
                <li>Monday - Friday : 9:00 to 17:00</li>
                <li className="mt-2">Saturday : 10:00 to 15:00</li>
                <li className="mt-2">Sunday : Day Off (Holiday)</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      <footer className="footer py-4 footer-bar bg-dark border-top border-secondary">
        <div className="container text-white-50 text-center">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <div className="text-sm-left">
                <p className="mb-0">{currentYear} © <span className="text-warning">Reverion Technologies Co.</span> Shaping the future of decentralized technology.</p>
              </div>
            </div>
            <div className="col-sm-4 text-sm-end">
              <a href="#" className="back-to-top d-inline-flex align-items-center justify-content-center" 
                 style={{ 
                   width: '45px', 
                   height: '45px', 
                   transform: 'rotate(45deg)', 
                   border: '1px solid #555',
                   borderRadius: '8px',
                   backgroundColor: '#333' 
                 }}>
                <FaArrowUp className="text-white" style={{ transform: 'rotate(-45deg)' }} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;