import HeroSection from '../components/landing/HeroSection';
import Features from '../components/landing/Features';
import Testimonials from '../components/landing/Testimonials';
import '../styles/pages/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <Features />
      <Testimonials />
    </div>
  );
};

export default LandingPage;