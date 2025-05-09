// src/components/quiz/QuizCard.jsx
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FiClock, FiAward, FiArrowRight } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const QuizCard = ({ quiz }) => {
  const difficultyColors = {
    easy: '#4CAF50',
    medium: '#FFC107',
    hard: '#F44336'
  };

  return (
    <Link to={`/quiz/${quiz.id}`} className="quiz-card-link">
      <div className="quiz-card">
        <div className="quiz-card-content">
          <div className="quiz-card-header">
            <h3 className="quiz-title">{quiz.title}</h3>
            <div className="quiz-difficulty" style={{ 
              backgroundColor: difficultyColors[quiz.difficulty] || '#9E9E9E'
            }}>
              {quiz.difficulty || 'unknown'}
            </div>
          </div>
          <p className="quiz-description">{quiz.description}</p>
          
          <div className="quiz-stats">
            <div className="stat-item">
              <FiClock className="stat-icon" />
              <span>{Math.floor(quiz.timeLimit / 60)} min</span>
            </div>
            <div className="stat-item">
              <FiAward className="stat-icon" />
              <span>{quiz.passingScore}% to pass</span>
            </div>
          </div>
          
          <div className="quiz-footer">
            <span className="quiz-date">
              Created: {format(new Date(quiz.createdAt), 'MMM dd, yyyy')}
            </span>
            <div className="take-quiz-btn">
              Take Quiz <FiArrowRight className="btn-icon" />
            </div>
          </div>
        </div>
        <div className="quiz-card-bg"></div>
      </div>
    </Link>
  );
};

export default QuizCard;