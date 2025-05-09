import React from 'react';
import '../../styles/pages/landing.css';

const testimonials = [
  {
    name: 'Sakshi Mehta',
    role: 'High School Teacher',
    quote: 'QuizWiz has transformed how I create assessments for my students. The analytics help me identify areas where they need more help.',
    avatar: 'https://i.pravatar.cc/150?img=49',
    rating: 5
  },
  {
    name: 'Amit Vanjari',
    role: 'Corporate Trainer',
    quote: 'Our employee training sessions are now interactive and engaging thanks to QuizWiz. The scenario-based questions are perfect for our needs.',
    avatar: 'https://i.pravatar.cc/150?img=52',
    rating: 4
  },
  {
    name: 'Ria Sen',
    role: 'Student',
    quote: 'I love challenging my friends with quizzes I create. The timed mode makes it super competitive! A perfect platform to create Quizes and have fun.',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5
  },
  {
    name: 'Neha Patel',
    role: 'University Professor',
    quote: 'The detailed analytics have helped me understand my students\' learning patterns better than any other tool I\'ve used.',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 5
  },
  {
    name: 'Rajiv Khanna',
    role: 'HR Manager',
    quote: 'We use QuizWiz for all our employee onboarding and training. The easy sharing feature saves us countless hours.',
    avatar: 'https://i.pravatar.cc/150?img=60',
    rating: 4
  },
  {
    name: 'Priya Sharma',
    role: 'Content Creator',
    quote: 'Creating interactive quizzes for my followers has never been easier. The engagement on my posts has doubled!',
    avatar: 'https://i.pravatar.cc/150?img=28',
    rating: 5
  }
];

const Testimonials = () => {
  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="section-title">
            Trusted by <span className="title-gradient">Thousands</span> of Happy Users
          </h2>
          <p className="section-subtitle">
            Don't just take our word for it - here's what our community has to say
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="testimonial-author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-card-bg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;