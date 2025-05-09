import { Link } from 'react-router-dom';
import QuizCard from './QuizCard';
import { FiPlus, FiSearch } from 'react-icons/fi';
import '../../styles/components/quiz.css';
import { useState } from 'react';

const QuizList = ({ quizzes, title, emptyMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <div className="header-content">
          <h2 className="quiz-list-title">{title}</h2>
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Link to="/create-quiz" className="create-quiz-btn">
          <FiPlus /> Create New
        </Link>
      </div>
      {filteredQuizzes.length > 0 ? (
        <div className="quiz-grid">
          {filteredQuizzes.map(quiz => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <div className="empty-quiz-list">
          <div className="empty-content">
            <h3>{quizzes.length === 0 ? emptyMessage : 'No matching quizzes found'}</h3>
            <p>Try adjusting your search or create a new quiz</p>
            <Link to="/create-quiz" className="create-quiz-btn primary">
              <FiPlus /> Create Your First Quiz
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;