import React from 'react';

const Cta = () => {
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="section bg-video bg-cta" style={{background: "url('images/landpict2.jpg') center center"}} id="video">
      <div className="bg-overlay"></div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-8" data-aos="fade-up">           
            <div>
              <h4 className="title text-uppercase text-white mb-4">Partner with Reverion Tech</h4>
              <p className="text-white-50 mx-auto para-desc mb-0">Create high-performance websites designed for success!</p>
            </div>        
            <a 
              href="#contact" 
              className="btn btn-custom"
              onClick={(e) => scrollToSection('contact', e)}
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;