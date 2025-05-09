// src/components/quiz/QuizFeedbackPage.jsx
import { useParams } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import Feedback from './Feedback';
import Leaderboard from './Leaderboard';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../shared/LoadingSpinner';
import '../../styles/components/quiz.css';

const QuizFeedbackPage = () => {
  const { quizId } = useParams();
  const { user } = useAuth();
  const { quizResults, getQuiz } = useQuiz();
  
  // Find the user's result for this quiz
  const userResult = quizResults.find(
    result => result.quizId === quizId && result.userId === user?.id
  );

  if (!userResult) {
    return (
      <div className="feedback-container">
        <h2>No feedback available</h2>
        <p>You haven't taken this quiz yet or results aren't available.</p>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-content">
        <Feedback 
          quizId={quizId} 
          passed={userResult.passed} 
          initialFeedback={userResult.feedback}
        />
      </div>
      <div className="leaderboard-section">
        <Leaderboard quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizFeedbackPage;