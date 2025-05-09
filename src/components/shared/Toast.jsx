import { useEffect, useState } from 'react';
import { useAuth} from '../../context/AuthContext';
import { useQuiz } from '../../context/QuizContext';
import '../../styles/components/shared.css';

const Toast = () => {
  const { error: authError } = useAuth();
  const { error: quizError } = useQuiz();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const error = authError || quizError;
    if (error) {
      setMessage(error);
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authError, quizError]);

  if (!show) return null;

  return (
    <div className="toast">
      <div className="toast-message">
        {message}
      </div>
      <button 
        className="toast-close-btn" 
        onClick={() => setShow(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;