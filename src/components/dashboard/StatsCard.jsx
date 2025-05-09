import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import '../../styles/components/dashboard.css';

const StatsCard = ({ title, value, icon, color, suffix = '', trend }) => {
  return (
    <div className="stats-card glassmorphism">
      <div className="stats-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p className="stats-value">
          {value}
          {suffix}
        </p>
      </div>
      {/* {trend === 'up' && <FiTrendingUp className="trend-icon trend-up" />}
      {trend === 'down' && <FiTrendingDown className="trend-icon trend-down" />} */}
    </div>
  );
};

export default StatsCard;