import React from 'react';

const SecondCta = () => {
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
    <section 
      className="section" 
      style={{
        background: "url('images/landingpict1.jpg') center center",
        backgroundSize: "cover",
        minHeight: "300px",
        height: "10px",
      }}
    >
      <div className="bg-overlay"></div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-10 text-center">
            <div data-aos="fade-up">
              <h4 className="title text-white text-uppercase mb-3">"We refine every detail."</h4>
              <p className="text-white-50 mx-auto para-desc">Shaping the future of decentralized technology</p>
            </div>
            {/* <div>
              <a 
                href="#contact" 
                className="btn btn-custom"
                onClick={(e) => scrollToSection('contact', e)}
              >
                Contact us
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondCta;