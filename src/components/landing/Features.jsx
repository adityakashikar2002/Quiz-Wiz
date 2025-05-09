import React from 'react';
  import '../../styles/pages/landing.css';
  import { BiTime, BiBarChartAlt, BiLink } from 'react-icons/bi';

  const features = [
    {
      icon: <BiTime size={32} />,
      title: 'Timed Challenges',
      description: 'Race against the clock with our timed quiz mode for an extra adrenaline rush.',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
    },
    {
      icon: <BiBarChartAlt size={32} />,
      title: 'Detailed Analytics',
      description: 'Track your progress with comprehensive stats and performance metrics.',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
      icon: <BiLink size={32} />,
      title: 'Easy Sharing',
      description: 'Share your quizzes via link or QR code with just one click.',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    }
  ];

  const Features = () => {
    return (
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="section-title">
              <span className="title-gradient">Powerful Features</span> to Elevate Your Quiz Experience
            </h2>
            <p className="section-subtitle">
              Discover tools designed to make learning fun, engaging, and competitive
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ '--card-gradient': feature.gradient }}
              >
                <div className="feature-icon-container">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Features;