// src/context/QuizContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { 
  createQuiz as createQuizApi,
  getQuizzes,
  getQuizById,
  submitQuiz,
  getQuizResults,
  getPredefinedQuizzes
} from '../utils/quiz';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useLocalStorage('quizAppQuizzes', []);
  const [userQuizzes, setUserQuizzes] = useLocalStorage('quizAppUserQuizzes', []);
  const [quizResults, setQuizResults] = useLocalStorage('quizAppResults', []);
  const [predefinedQuizzes, setPredefinedQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();


  useEffect(() => {
    if (user) {
      loadUserQuizzes();
      loadQuizResults();
    }
    loadPredefinedQuizzes();
  }, [user]);

  const loadPredefinedQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getPredefinedQuizzes();
      setPredefinedQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const loadQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const loadUserQuizzes = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getQuizzes(user.id);
      setUserQuizzes(data);
    } catch (err) {
      setError(err.message || 'Failed to load your quizzes');
    } finally {
      setLoading(false);
    }
  };

  const loadQuizResults = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getQuizResults(user.id);
      setQuizResults(data);
    } catch (err) {
      setError(err.message || 'Failed to load quiz results');
    } finally {
      setLoading(false);
    }
  };

  const createQuiz = async (quizData) => {
    setLoading(true);
    try {
      const newQuiz = await createQuizApi(quizData, user.id);
      setUserQuizzes(prev => [...prev, newQuiz]);
      return newQuiz;
    } catch (err) {
      setError(err.message || 'Failed to create quiz');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getQuiz = async (quizId) => {
    setLoading(true);
    try {
      // First check user quizzes
      const userQuiz = userQuizzes.find(q => q.id === quizId);
      if (userQuiz) return userQuiz;
      
      // Then check predefined quizzes
      const predefinedQuiz = predefinedQuizzes.find(q => q.id === quizId);
      if (predefinedQuiz) return predefinedQuiz;
      
      // Finally check all quizzes
      return await getQuizById(quizId);
    } catch (err) {
      setError(err.message || 'Failed to load quiz');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const submitQuizAnswers = async (quizId, answers) => {
  //   const quiz = await getQuiz(quizId);
  //   let score = 0;
  //   const results = quiz.questions.map(question => {
  //     const userAnswer = answers[question.id];
  //     const isCorrect = userAnswer === question.correctAnswer;
  //     if (isCorrect) {
  //       score += question.points;
  //     }
  //     return {
  //       questionId: question.id,
  //       questionText: question.text,
  //       userAnswer,
  //       correctAnswer: question.correctAnswer,
  //       isCorrect,
  //       points: question.points,
  //     };
  //   });

  //   const maxScore = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  //   const percentage = Math.round((score / maxScore) * 100);
  //   const passed = percentage >= quiz.passingScore;

  //   const result = {
  //     id: Date.now().toString(),
  //     quizId,
  //     quizTitle: quiz.title,
  //     userId: user?.id || 'guest',
  //     userName: user?.name || 'Guest', // Add user name
  //     score,
  //     maxScore,
  //     percentage,
  //     passed,
  //     results,
  //     submittedAt: new Date().toISOString(),
  //     timeTaken: answers.timeTaken || 0,
  //   };

  //   // Always save results for predefined quizzes
  //   // Always save results for predefined quizzes
  //   if (quiz.creatorId === 'system' || user) {
  //     const allResults = [...quizResults, result];
  //     setQuizResults(allResults);
  //     await submitQuiz(quizId, user?.id || 'guest', user?.name || 'Guest', answers); // Pass userName here
  //   }

  //   return result;
  // };


  const submitQuizAnswers = async (quizId, answers) => {
    const quiz = await getQuiz(quizId);
    let score = 0;
    
    const results = quiz.questions.map(question => {
      const userAnswer = answers[question.id];
      const correctAnswer = question.correctAnswer;
      const points = Number(question.points) || 1; // Ensure points is a number
      const isCorrect = String(userAnswer) === String(correctAnswer);
      
      if (isCorrect) {
        score += points;
      }
      
      return {
        questionId: question.id,
        questionText: question.text,
        userAnswer,
        correctAnswer,
        isCorrect,
        points,
      };
    });

    const maxScore = quiz.questions.reduce(
      (sum, q) => sum + (Number(q.points) || 1), 
      0
    );
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= (quiz.passingScore || 50); // Default passing score

    const result = {
      id: Date.now().toString(),
      quizId,
      quizTitle: quiz.title,
      userId: user?.id || 'guest',
      userName: user?.name || 'Guest',
      score,
      maxScore,
      percentage,
      passed,
      results,
      submittedAt: new Date().toISOString(),
      timeTaken: answers.timeTaken || 0,
    };

    if (quiz.creatorId === 'system' || user) {
      const allResults = [...quizResults, result];
      setQuizResults(allResults);
      await submitQuiz(quizId, user?.id || 'guest', user?.name || 'Guest', answers);
    }

    return result;
  };

  // Update getLeaderboard function
  const getLeaderboard = async (quizId) => {
    try {
      const results = await getQuizResults(null, quizId);
      return results
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 10)
        .map(result => ({
          ...result,
          displayName: result.userName || 
                    (result.userId === 'guest' ? 'Guest' : `User ${result.userId.slice(0, 6)}`)
        }));
    } catch (err) {
      setError(err.message || 'Failed to load leaderboard');
      return [];
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        userQuizzes,
        quizResults,
        predefinedQuizzes,
        loading,
        error,
        loadQuizzes,
        loadUserQuizzes,
        loadQuizResults,
        createQuiz,
        getQuiz,
        submitQuizAnswers,
        getLeaderboard,
        loadPredefinedQuizzes
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);