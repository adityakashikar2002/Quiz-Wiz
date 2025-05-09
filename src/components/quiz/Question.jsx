import { FaRegCircle, FaRegCheckCircle, FaCheck } from 'react-icons/fa';
import '../../styles/components/quiz.css';

const Question = ({ question, selectedAnswer, onAnswerSelect }) => {
  const handleOptionSelect = (option) => {
    onAnswerSelect(question.id, option);
  };

  const handleTextInput = (e) => {
    onAnswerSelect(question.id, e.target.value);
  };

  const renderOptionIcon = (optionValue, isSelected) => {
    if (isSelected) {
      return <FaRegCheckCircle className="option-icon selected" />;
    }
    return <FaRegCircle className="option-icon" />;
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <h3 className="question-text">{question.text}</h3>
        <div className="question-type-badge">
          {question.type.replace(/-/g, ' ')}
        </div>
      </div>
      
      {question.type === 'multiple-choice' && (
        <ul className="options-list">
          {question.options.map((option, index) => (
            <li 
              key={index} 
              className={`option-item ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
            >
              {renderOptionIcon(option, selectedAnswer === option)}
              <span className="option-text">{option}</span>
              {selectedAnswer === option && (
                <FaCheck className="option-checkmark" />
              )}
            </li>
          ))}
        </ul>
      )}
      
      {question.type === 'true-false' && (
        <div className="true-false-options">
          <div 
            className={`tf-option ${selectedAnswer === 'True' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('True')}
          >
            {renderOptionIcon('True', selectedAnswer === 'True')}
            <span className="option-text">True</span>
            {selectedAnswer === 'True' && (
              <FaCheck className="option-checkmark" />
            )}
          </div>
          <div 
            className={`tf-option ${selectedAnswer === 'False' ? 'selected' : ''}`}
            onClick={() => handleOptionSelect('False')}
          >
            {renderOptionIcon('False', selectedAnswer === 'False')}
            <span className="option-text">False</span>
            {selectedAnswer === 'False' && (
              <FaCheck className="option-checkmark" />
            )}
          </div>
        </div>
      )}
      
      {question.type === 'fill-in-blank' && (
        <div className="fill-blank-input">
          <input
            type="text"
            value={selectedAnswer || ''}
            onChange={handleTextInput}
            placeholder="Type your answer here..."
            className="blank-input"
          />
        </div>
      )}
    </div>
  );
};

export default Question;