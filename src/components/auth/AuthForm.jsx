import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../shared/LoadingSpinner';
import '../../styles/components/auth.css';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const AuthForm = ({ type, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p>{type === 'login' ? 'Login to access your dashboard' : 'Join us to get started'}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {type === 'signup' && (
          <div className="form-group">
            <label htmlFor="name">
              <FiUser className="input-icon" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">
            <FiMail className="input-icon" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">
            <FiLock className="input-icon" />
            <span>Password</span>
          </label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength="6"
            />
            {/* <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button> */}
          </div>
        </div>
        
        {type === 'signup' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FiLock className="input-icon" />
              <span>Confirm Password</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                minLength="6"
              />
              {/* <button 
                type="button" 
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button> */}
            </div>
          </div>
        )}
        
        {type === 'login' && (
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
          </div>
        )}
        
        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? (
            <LoadingSpinner small />
          ) : (
            <span>{type === 'login' ? 'Login' : 'Sign Up'}</span>
          )}
        </button>
      </form>
      
      <div className="auth-switch">
        {type === 'login' ? (
          <>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;