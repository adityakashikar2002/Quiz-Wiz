// import { Link } from 'react-router-dom';
// import '../../styles/pages/landing.css';
// import { useEffect } from 'react';

// const HeroSection = () => {
//   useEffect(() => {
//     // Add particles effect
//     const script = document.createElement('script');
//     script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <section className="hero-section">
//       <div id="particles-js" className="particles-background"></div>
//       <div className="hero-content">
//         <div className="hero-text">
//           <h1 className="hero-title">
//             <span className="title-gradient">Test Your Knowledge</span>
//             <span className="title-sub">with QuizWiz</span>
//           </h1>
//           <p className="hero-subtitle">
//             Create, share, and take interactive quizzes on any topic. 
//             Challenge yourself and others with our engaging platform.
//           </p>
//           <div className="hero-buttons">
//             <Link to="/signup" className="hero-btn primary">
//               <span>Get Started</span>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </Link>
//             <Link to="/login" className="hero-btn secondary">
//               <span>Login</span>
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </Link>
//           </div>
//           <div className="hero-stats">
//             <div className="stat-item">
//               <div className="stat-number">10,000+</div>
//               <div className="stat-label">Quizzes</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-number">500K+</div>
//               <div className="stat-label">Users</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-number">98%</div>
//               <div className="stat-label">Satisfaction</div>
//             </div>
//           </div>
//         </div>
//         <div className="hero-image">
//           <div className="quiz-card-container">
//             <div className="floating-quiz-card quiz-card-1">
//               <div className="quiz-card-badge">Popular</div>
//               <div className="quiz-card-content">
//                 <div className="quiz-card-icon">
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
//                   </svg>
//                 </div>
//                 <h3>Science Quiz</h3>
//                 <p>10 Questions • Medium</p>
//                 <div className="quiz-card-footer">
//                   <div className="quiz-card-rating">
//                     <span>4.8</span>
//                     <div className="stars">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 4 ? 0 : 1}/>
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                   <button className="quiz-card-button">Take Quiz</button>
//                 </div>
//               </div>
//             </div>
//             <div className="floating-quiz-card quiz-card-2">
//               <div className="quiz-card-content">
//                 <div className="quiz-card-icon">
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h3>History Challenge</h3>
//                 <p>15 Questions • Hard</p>
//                 <div className="quiz-card-footer">
//                   <div className="quiz-card-rating">
//                     <span>4.5</span>
//                     <div className="stars">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 4 ? 0 : 1}/>
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                   <button className="quiz-card-button">Take Quiz</button>
//                 </div>
//               </div>
//             </div>
//             <div className="floating-quiz-card quiz-card-3">
//               <div className="quiz-card-badge">New</div>
//               <div className="quiz-card-content">
//                 <div className="quiz-card-icon">
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M12 8H16M12 12H16M12 16H16M8 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                 </div>
//                 <h3>Math Puzzle</h3>
//                 <p>8 Questions • Easy</p>
//                 <div className="quiz-card-footer">
//                   <div className="quiz-card-rating">
//                     <span>4.9</span>
//                     <div className="stars">
//                       {[...Array(5)].map((_, i) => (
//                         <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 5 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 5 ? 0 : 1}/>
//                         </svg>
//                       ))}
//                     </div>
//                   </div>
//                   <button className="quiz-card-button">Take Quiz</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;



// src/components/landing/HeroSection.jsx
import { Link } from 'react-router-dom';
import '../../styles/pages/landing.css';
import { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    // Add particles effect
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="hero-section">
      <div id="particles-js" className="particles-background"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-gradient">Test Your Knowledge</span>
            <span className="title-sub">with QuizWiz</span>
          </h1>
          <p className="hero-subtitle">
            Create, share, and take interactive quizzes on any topic. 
            Challenge yourself and others with our engaging platform.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-btn primary">
              <span>Get Started</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/login" className="hero-btn secondary">
              <span>Login</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Quizzes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="quiz-card-container">
              <div className="floating-quiz-card quiz-card-1">
                <div className="quiz-card-badge">Popular</div>
                <div className="quiz-card-content">
                  <div className="quiz-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3>Science Quiz</h3>
                  <p>10 Questions • Medium</p>
                  <div className="quiz-card-footer">
                    <div className="quiz-card-rating">
                      <span>4.8</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 4 ? 0 : 1}/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <Link to="/quiz/science-quiz" className="quiz-card-button">Take Quiz</Link>
                  </div>
                </div>
              </div>
            
                <div className="floating-quiz-card quiz-card-2">
                  <div className="quiz-card-content">
                    <div className="quiz-card-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>History Challenge</h3>
                    <p>15 Questions • Hard</p>
                    <div className="quiz-card-footer">
                      <div className="quiz-card-rating">
                        <span>4.5</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 4 ? 0 : 1}/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <Link to="/quiz/history-challenge" className="quiz-card-button">Take Quiz</Link>
                    </div>
                  </div>
                </div>
            

              <div className="floating-quiz-card quiz-card-3">
                <div className="quiz-card-badge">New</div>
                <div className="quiz-card-content">
                  <div className="quiz-card-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3H21V21H3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H16M12 12H16M12 16H16M8 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Math Puzzle</h3>
                  <p>8 Questions • Easy</p>
                  <div className="quiz-card-footer">
                    <div className="quiz-card-rating">
                      <span>4.9</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < 5 ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeWidth={i < 5 ? 0 : 1}/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <Link to="/quiz/math-puzzle" className="quiz-card-button">Take Quiz</Link>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;