// src/components/quiz/Leaderboard.jsx
import { useState, useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { FiAward } from 'react-icons/fi';
// import '../../styles/components/quiz.css';
import '../../styles/pages/quizzes.css'

const Leaderboard = ({ quizId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getLeaderboard } = useQuiz();

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await getLeaderboard(quizId);
      setLeaderboard(data);
      setLoading(false);
    };
    loadLeaderboard();
  }, [quizId, getLeaderboard]);

  if (loading) {
    return <div className="loading-text">Loading leaderboard...</div>;
  }

  if (leaderboard.length === 0) {
    return <div className="no-data">No results yet for this quiz</div>;
  }

  return (
    <div className="leaderboard-container">
      <h3 className="leaderboard-title">
        <FiAward className="icon" /> Top Performers
      </h3>
      {/* <ul className="leaderboard-list">
        {leaderboard.map((result, index) => (
          <li key={result.id} className="leaderboard-item">
            <div className="leaderboard-rank">{index + 1}</div>
            <div className="leaderboard-user">
              {result.userId === 'guest' ? 'Guest' : `User ${result.userId.slice(0, 6)}`}
            </div>
            <div className="leaderboard-score">
              {result.percentage}% ({result.score}/{result.maxScore})
            </div>
          </li>
        ))}
      </ul> */}
      <ul className="leaderboard-list">
        {leaderboard.map((result, index) => (
          <li key={result.id} className="leaderboard-item">
            <div className="leaderboard-rank">{index + 1}</div>
            <div className="leaderboard-user">
              {result.displayName}
            </div>
            <div className="leaderboard-score">
              {result.percentage}% ({result.score}/{result.maxScore})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;