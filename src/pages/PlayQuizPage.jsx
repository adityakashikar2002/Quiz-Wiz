import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import QuizPlayer from '../components/quiz/QuizPlayer';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const PlayQuizPage = () => {
  const { quizId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not authenticated, redirect to login with return URL
    if (!isAuthenticated) {
      navigate(`/login?redirect=/quiz/${quizId}`);
      return;
    }

    // If already authenticated, proceed to play the quiz
  }, [isAuthenticated, quizId, navigate]);

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <div className="play-quiz-page">
      <QuizPlayer />
    </div>
  );
};

export default PlayQuizPage;