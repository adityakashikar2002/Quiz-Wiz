import { useEffect } from 'react';
import { formatTime } from '../../utils/helpers';
import { FiClock } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const Timer = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft, onTimeUp]);

  const getTimerColor = () => {
    const minutes = Math.floor(timeLeft / 60);
    if (minutes < 1) return 'var(--danger-color)';
    if (minutes < 3) return 'var(--warning-color)';
    return 'var(--success-color)';
  };

  return (
    <div className="timer" style={{ color: getTimerColor() }}>
      <FiClock className="timer-icon" />
      <span className="time-text">{formatTime(timeLeft)}</span>
      {timeLeft < 60 && (
        <div className="time-warning">Hurry up!</div>
      )}
    </div>
  );
};

export default Timer;