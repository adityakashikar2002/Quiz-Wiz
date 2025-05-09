import { useNavigate } from 'react-router-dom';
import Feedback from './Feedback';
import { FiAward, FiClock, FiArrowLeft, FiRepeat } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const Results = ({ result, quiz }) => {
  const navigate = useNavigate();
  const percentage = Math.round(result.percentage);
  const passed = result.passed;

  return (
    <div className="results-container">
      <div className={`results-header ${passed ? 'passed' : 'failed'}`}>
        <div className="result-badge">
          {passed ? (
            <FiAward className="badge-icon" />
          ) : (
            <div className="failed-icon">!</div>
          )}
        </div>
        <h1>{passed ? 'Quiz Passed!' : 'Quiz Failed'}</h1>
        <div className="score-circle">
          <span>{percentage}%</span>
        </div>
        <div className="result-stats">
          <div className="stat-item">
            <FiAward className="stat-icon" />
            <span>{result.score} out of {result.maxScore} points</span>
          </div>
          <div className="stat-item">
            <FiClock className="stat-icon" />
            <span>Time: {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s</span>
          </div>
        </div>
      </div>
      
      <div className="results-details">
        <h2>Question Breakdown</h2>
        <ul className="results-list">
          {result.results.map((item, index) => (
            <li key={index} className={`result-item ${item.isCorrect ? 'correct' : 'incorrect'}`}>
              <div className="result-marker">
                {item.isCorrect ? (
                  <div className="correct-marker">✓</div>
                ) : (
                  <div className="incorrect-marker">✗</div>
                )}
              </div>
              <div className="result-content">
                <div className="question-result">
                  <span className="question-number">Q{index + 1}:</span>
                  <span className="question-text">{item.questionText}</span>
                </div>
                <div className="answer-comparison">
                  <span className="user-answer">Your answer: {item.userAnswer}</span>
                  {!item.isCorrect && (
                    <span className="correct-answer">Correct answer: {item.correctAnswer}</span>
                  )}
                </div>
              </div>
              <div className="points-earned">
                {item.isCorrect ? '+' : '-'}{item.points} point{item.points !== 1 ? 's' : ''}
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <Feedback quizId={quiz.id} passed={passed} />
      
      <div className="results-actions">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="dashboard-btn"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <button 
          onClick={() => window.location.reload()} 
          className="retake-btn"
        >
          <FiRepeat /> Retake Quiz
        </button>
      </div>
    </div>
  );
};

export default Results;