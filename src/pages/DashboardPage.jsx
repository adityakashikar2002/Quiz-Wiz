import Dashboard from '../components/dashboard/Dashboard';
import QuizList from '../components/quiz/QuizList';
import { useQuiz } from '../context/QuizContext';
import '../styles/components/dashboard.css';

const DashboardPage = () => {
  const { userQuizzes } = useQuiz();

  return (
    <div className="dashboard-page">
      <div className="dashboard-gradient-bg">
        <div className="dashboard-content-wrapper">
          <Dashboard />
          <QuizList 
            quizzes={userQuizzes} 
            title="Your Quizzes"
            emptyMessage="You haven't created any quizzes yet."
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;