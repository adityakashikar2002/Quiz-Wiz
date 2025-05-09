import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      navigate(redirectTo);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} loading={loading} />;
};

export default Login;