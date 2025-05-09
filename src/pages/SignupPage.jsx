import Signup from '../components/auth/Signup';
import '../styles/components/auth.css';
import AuthIllustration from '../assets/auth-illustration2.svg';

const SignupPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-illustration">
        <img src={AuthIllustration} alt="Authentication illustration" />
      </div>
      <div className="auth-content">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;