import React from 'react';

const StartProject = () => {
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
    <section className="section bg-video bg-cta" style={{background: "url('images/landpict2.jpg') center center"}} id="project">
      <div className="bg-overlay"></div>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8" data-aos="fade-up">
            <div>
              <h4 className="title text-uppercase text-white mb-4">Ready to Start Your Project?</h4>
              <p className="text-white-50 mx-auto para-desc mb-4">Our team is here to help you every step of the way.</p>
            </div>
            
            <a 
              href="https://forms.clickup.com/9016503780/p/f/8cptvf4-496/BTYBZQ6D05CPYSPJKU/project-intake-form" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-custom"
            >
              <i className="fas fa-phone-alt me-2"></i> Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProject;