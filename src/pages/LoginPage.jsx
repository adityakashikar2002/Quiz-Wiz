import Login from '../components/auth/Login';
import '../styles/components/auth.css';
import AuthIllustration from '../assets/auth-illustration.svg';

const LoginPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-illustration">
        <img src={AuthIllustration} alt="Authentication illustration" />
      </div>
      <div className="auth-content">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;