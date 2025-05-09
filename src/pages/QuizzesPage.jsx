// src/pages/QuizzesPage.jsx
import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import QuizList from '../components/quiz/QuizList';
import '../styles/pages/quizzes.css';

const QuizzesPage = () => {
  const { predefinedQuizzes, loading, loadPredefinedQuizzes } = useQuiz();

  useEffect(() => {
    loadPredefinedQuizzes();
  }, []);

  return (
    <div className="quizzes-page">
      <div className="quizzes-header">
        <h1>Explore Quizzes</h1>
        <p>Test your knowledge with our collection of quizzes</p>
      </div>
      <QuizList 
        quizzes={predefinedQuizzes} 
        title="Featured Quizzes"
        emptyMessage="No quizzes available at the moment"
      />
    </div>
  );
};

export default QuizzesPage;