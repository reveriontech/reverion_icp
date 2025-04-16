import React from 'react';
import { FaPencilRuler, FaLaptopCode, FaEthereum, FaRobot, FaShoppingCart, FaDatabase, FaCloud, FaSearch } from 'react-icons/fa';

const Services = () => {
  // Service data array for cleaner rendering
  const services = [
    {
      id: 1,
      icon: <FaPencilRuler size={24} />,
      title: "UI/UX Web Design",
      description: [
        "User research and persona development",
        "Wireframing, prototyping, and visual design",
        "Usability testing and interaction design"
      ]
    },
    {
      id: 2,
      icon: <FaLaptopCode size={24} />,
      title: "Custom Web Application Development",
      description: [
        "Full-stack development with modern frameworks",
        "Responsive design and third-party integrations",
      ]
    },
    {
      id: 3,
      icon: <FaEthereum size={24} />,
      title: "Web3 & Blockchain Development",
      description: [
        "Smart contracts and decentralized applications",
        "NFT marketplaces and enterprise blockchain solutions",
      ]
    },
    {
      id: 4,
      icon: <FaRobot size={24} />,
      title: "Enterprise AI Integration",
      description: [
        "Custom AI models and predictive analytics",
        "Natural language processing and computer vision",
      ]
    },
    {
      id: 5,
      icon: <FaShoppingCart size={24} />,
      title: "E-commerce Solutions",
      description: [
        "Custom platforms and headless commerce",
        "Payment integrations and inventory management",
      ]
    },
    {
      id: 6,
      icon: <FaDatabase size={24} />,
      title: "Enterprise Data Engineering",
      description: [
        "Data pipelines and warehouse implementation",
        "Business intelligence and big data architecture",
      ]
    },
    {
      id: 7,
      icon: <FaCloud size={24} />,
      title: "Cloud Migration & DevOps",
      description: [
        "Cloud migration strategy and Infrastructure as Code",
        "CI/CD pipelines and containerization",
      ]
    },
    {
      id: 8,
      icon: <FaSearch size={24} />,
      title: "SEO & Digital Marketing",
      description: [
        "Technical and on-page SEO optimization",
        "International SEO for global markets",
        "Content strategy and link building"
      ]
    }
  ];

  return (
    <section className="section bg-light" id="offer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div data-aos="fade-up">
              <h4 className="title text-uppercase mb-4">What We Offer ?</h4>
              <p className="text-muted mx-auto para-desc mb-0">
                Empower your business with innovative, scalable, and future-ready solutions. 
                Our expert team specializes in next-generation technology services to help you 
                stay ahead in the digital landscape.
              </p>
            </div>
          </div>
        </div>

        <div className="row" data-aos="fade-up">
          {services.map(service => (
            <div className="col-lg-4 col-md-6 mt-5 pt-4" key={service.id}>
              <div className="services border pt-5 p-4 rounded bg-white">
                <div className="icon position-relative border rounded bg-white mb-4 d-flex align-items-center justify-content-center">
                  {service.icon}
                </div>
                <div className="content">
                  <h4 className="title mb-3">{service.title}</h4>
                  <ul className="mb-0">
                    {service.description.map((item, index) => (
                      <li key={index} className="mb-2 text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>          
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;