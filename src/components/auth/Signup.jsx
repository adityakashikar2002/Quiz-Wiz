import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Signup = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await signup(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />;
};

export default Signup;