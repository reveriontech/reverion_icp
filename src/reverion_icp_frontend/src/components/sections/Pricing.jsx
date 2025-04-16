import React, { useEffect } from 'react';

const Pricing = () => {
  // Load FontAwesome CSS dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  // Pricing plans data with benefits-focused approach
  const pricingPlans = [
    {
      id: 1,
      name: "Starter Package",
      isHighlighted: false,
      tagline: "Essential foundation for new ventures",
      benefits: [
        {text: "Perfect for small businesses and startups", icon: "fa-bullseye"},
        {text: "Essential features to establish your digital presence", icon: "fa-globe"},
        {text: "User-friendly interface with minimal learning curve", icon: "fa-mouse-pointer"},
        {text: "Quick implementation and deployment", icon: "fa-bolt"},
        {text: "Email support within 24 hours", icon: "fa-envelope"}
      ]
    },
    {
      id: 2,
      name: "Growth",
      isHighlighted: true,
      tagline: "Accelerate your business expansion",
      benefits: [
        {text: "Ideal for expanding businesses with growing needs", icon: "fa-expand-arrows-alt"},
        {text: "Advanced features to scale your operations", icon: "fa-cogs"},
        {text: "Detailed analytics and reporting capabilities", icon: "fa-chart-bar"},
        {text: "Automation tools to improve efficiency", icon: "fa-magic"},
        {text: "Priority support with dedicated account manager", icon: "fa-headset"},
        {text: "Regular system updates and enhancements", icon: "fa-sync"}
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      isHighlighted: false,
      tagline: "Enterprise-grade solutions for complex needs",
      benefits: [
        {text: "Tailored solutions for large organizations", icon: "fa-puzzle-piece"},
        {text: "Custom feature development to match your workflow", icon: "fa-code"},
        {text: "Advanced security and compliance measures", icon: "fa-shield-alt"},
        {text: "Unlimited users with role-based access control", icon: "fa-users-cog"},
        {text: "24/7 premium support with guaranteed response times", icon: "fa-life-ring"},
        {text: "Quarterly strategy sessions with our experts", icon: "fa-handshake"}
      ]
    }
  ];

  return (
    <section className="section" id="price">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div data-aos="fade-up">
              <div className="mb-4">
                <i className="fas fa-layer-group fa-3x text-primary"></i>
              </div>
              <h4 className="title text-uppercase mb-4">Solutions That Scale With Your Business</h4>
              <p className="text-muted mb-0">We offer flexible packages designed to meet your specific needs at any stage of your business journey.</p>
              <a href="https://calendly.com/reveriontech" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                <i className="fas fa-calendar-check mr-2"></i> Book a Free Consultation to Discuss Your Needs
              </a>
            </div>
          </div>
        </div>

        <div className="row mt-5" data-aos="fade-up">
          {pricingPlans.map(plan => (
            <div 
              className="col-lg-4 col-md-4 mb-4" 
              key={plan.id}
            >
              <div className="card text-center h-100 border-0 overflow-hidden shadow-sm">
                <div 
                  className="position-relative"
                  style={{ 
                    height: '130px',
                    background: `linear-gradient(to right, rgba(240, 240, 240, 0.8), ${plan.id === 2 ? '#f7b924' : '#0d6efd'} 80%)`,
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                  }}
                >
                  {plan.id === 2 && (
                    <div 
                      className="recommended-badge" 
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '3px 12px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        zIndex: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                    >
                      RECOMMENDED
                    </div>
                  )}
                  
                  <div className="row h-100 g-0">
                    <div className="col-5 position-relative">
                      <img 
                        src={
                          plan.id === 1 ? "/images/39 Astronaut jumping happy.png" : 
                          plan.id === 2 ? "/images/14 Astronaut typing with fly1.png" : 
                          "/images/27 Astronaut ride a rocket.png"
                        }
                        alt={`${plan.name} illustration`} 
                        className="position-absolute"
                        style={{ 
                          maxHeight: '150px',
                          bottom: '-20px',
                          left: '5px',
                          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                        }}
                      />
                    </div>
                    <div className="col-7 text-start d-flex flex-column justify-content-center pe-3">
                      <h5 className="mb-1 text-uppercase text-white fw-bold">{plan.name}</h5>
                      <p className="mb-0 small text-white opacity-90">{plan.tagline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-body d-flex flex-column p-4">
                  <ul className="list-unstyled text-start" style={{flex: 1}}>
                    {plan.benefits.map((benefit, index) => (
                      <li className={index > 0 ? "border-top pt-2 mt-2" : ""} key={index}>
                        <div className="d-flex align-items-start">
                          <div className="icon-container" style={{minWidth: "24px", marginTop: "3px"}}>
                            <i className="fas fa-check-circle" style={{
                              color: plan.id === 2 ? "#f7b924" : "#0d6efd",
                              fontSize: "16px"
                            }}></i>
                          </div>
                          <span className="ms-2">{benefit.text}</span>
                        </div>
                      </li>
                    ))}
                    {plan.id === 1 && (
                      <li className="border-top pt-3 mt-3 invisible">
                        <div className="d-flex align-items-start">
                          <div className="icon-container" style={{minWidth: "24px"}}>
                            <i className="fas fa-check-circle"></i>
                          </div>
                          <span className="ms-2">Spacer item</span>
                        </div>
                      </li>
                    )}
                  </ul>
                  
                  <div className="mt-auto pt-3">
                    <a 
                      href={`https://calendly.com/reveriontech?package=${plan.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`btn ${plan.id === 2 ? 'btn-warning' : 'btn-outline-primary'} w-100 py-2 rounded-pill`}
                      style={{
                        fontWeight: plan.id === 2 ? 'bold' : 'normal',
                        fontSize: '0.9rem',
                        boxShadow: plan.id === 2 ? '0 4px 8px rgba(247, 185, 36, 0.3)' : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="fas fa-comments me-2"></i> Book Us A Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;