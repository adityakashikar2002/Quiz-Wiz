// src/components/quiz/QuizPlayer.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuiz } from '../../context/QuizContext';
import Question from './Question';
import Timer from './Timer';
import Results from './Results';
import LoadingSpinner from '../shared/LoadingSpinner';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const QuizPlayer = () => {
  const { quizId } = useParams();
  const { getQuiz, submitQuizAnswers } = useQuiz();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      try {
        const quizData = await getQuiz(quizId);
        setQuiz(quizData);
        setTimeLeft(quizData.timeLimit);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load quiz');
        setLoading(false);
      }
    };
    loadQuiz();
  }, [quizId, getQuiz]);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // const handleSubmitQuiz = async () => {
  //   try {
  //     const quizResult = await submitQuizAnswers(quizId, {
  //       ...answers,
  //       timeTaken: quiz.timeLimit - timeLeft,
  //     });
  //     setResult(quizResult);
  //     setQuizCompleted(true);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  const handleSubmitQuiz = async () => {
    try {
      console.log('Submitting answers:', answers);
      console.log('Quiz questions:', quiz.questions);
      
      const quizResult = await submitQuizAnswers(quizId, {
        ...answers,
        timeTaken: quiz.timeLimit - timeLeft,
      });
      
      console.log('Quiz result:', quizResult);
      setResult(quizResult);
      setQuizCompleted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message);
    }
  };

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="quiz-error">Error: {error}</div>;
  if (!quiz) return <div className="quiz-not-found">Quiz not found</div>;

  if (quizCompleted) {
    return <Results result={result} quiz={quiz} />;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const allQuestionsAnswered = Object.keys(answers).length === quiz.questions.length;

  return (
    <div className="quiz-player-container">
      <div className="quiz-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FiArrowLeft /> Back
        </button>
        <div className="quiz-title-wrapper">
          <h1 className="quiz-title">{quiz.title}</h1>
          {user && quiz.creatorId === user.id && (
            <div className="creator-mode-banner">
              Creator Mode
            </div>
          )}
        </div>
        <Timer 
          timeLeft={timeLeft} 
          setTimeLeft={setTimeLeft} 
          onTimeUp={handleTimeUp} 
        />
      </div>
      
      <div className="quiz-progress">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
        <span className="progress-text">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </span>
      </div>
      
      <Question
        question={currentQuestion}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
      />
      
      <div className="quiz-navigation">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="nav-btn prev-btn"
        >
          <FiArrowLeft /> Previous
        </button>
        
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion.id]}
            className="nav-btn next-btn"
          >
            Next <FiArrowRight />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            disabled={!allQuestionsAnswered}
            className="nav-btn submit-btn"
          >
            Submit Quiz <FiCheck />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPlayer;
