import { useState } from 'react';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const Feedback = ({ quizId, passed }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { quizId, feedback });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="feedback-thank-you">
        <FiCheckCircle className="thank-you-icon" />
        <h3>Thank you for your feedback!</h3>
        <p>We appreciate your time and will use this to improve our quizzes.</p>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h2>How was your experience?</h2>
        <p>We'd love to hear your thoughts about this quiz</p>
      </div>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={`Tell us what you ${passed ? 'liked' : 'found challenging'} about this quiz...`}
            rows="4"
          />
        </div>
        <button type="submit" className="submit-feedback-btn">
          <FiSend className="btn-icon" /> Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;