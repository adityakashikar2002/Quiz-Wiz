import { useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import StatsCard from './StatsCard';
import ProgressChart from './ProgressChart';
import RecentActivity from './RecentActivity';
import '../../styles/components/dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { userQuizzes, quizResults, loadUserQuizzes, loadQuizResults } = useQuiz();

  useEffect(() => {
    loadUserQuizzes();
    loadQuizResults();
  }, []);

  const stats = [
    {
      title: 'Quizzes Created',
      value: userQuizzes.length,
      icon: '📝',
      color: '#4CAF50',
      trend: userQuizzes.length > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Quizzes Taken',
      value: quizResults.length,
      icon: '📊',
      color: '#2196F3',
      trend: quizResults.length > 0 ? 'up' : 'neutral'
    },
    {
      title: 'Average Score',
      value: quizResults.length > 0 
        ? Math.round(quizResults.reduce((sum, result) => sum + result.percentage, 0) / quizResults.length)
        : 0,
      suffix: '%',
      icon: '🏆',
      color: '#FFC107',
      trend: 'up'
    },
    {
      title: 'Pass Rate',
      value: quizResults.length > 0
        ? Math.round((quizResults.filter(r => r.passed).length / quizResults.length) * 100)
        : 0,
      suffix: '%',
      icon: '✅',
      color: '#9C27B0',
      trend: quizResults.filter(r => r.passed).length > 0 ? 'up' : 'neutral'
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Dashboard</h1>
        <p className="dashboard-subtitle">Track your learning progress and achievements</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container glassmorphism">
          <div className="chart-header">
            <h3>Your Progress</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-color" style={{backgroundColor: '#4CAF50'}}></span>
                Quiz Performance
              </span>
            </div>
          </div>
          <ProgressChart results={quizResults} />
        </div>
        
        <div className="activity-container glassmorphism">
          <div className="activity-header">
            <h3>Recent Activity</h3>
            {/* <Link to="/quiz-results" className="view-all">View All</Link> */}
          </div>
          <RecentActivity results={quizResults} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;