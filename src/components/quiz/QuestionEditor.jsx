import { useState } from 'react';
import { FiPlus, FiX, FiEdit2, FiTrash2, FiCheck, FiArrowLeft } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const questionTypes = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'true-false', label: 'True/False' },
  { value: 'fill-in-blank', label: 'Fill in the Blank' },
];

const QuestionEditor = ({ 
  questions, 
  onAddQuestion, 
  onUpdateQuestion, 
  onRemoveQuestion 
}) => {
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'multiple-choice',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const handleAddOption = () => {
    setNewQuestion(prev => ({ 
      ...prev, 
      options: [...prev.options, ''] 
    }));
  };

  const handleRemoveOption = (index) => {
    const newOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmitQuestion = () => {
    if (!newQuestion.text.trim()) {
      alert('Question text is required');
      return;
    }

    if (newQuestion.type !== 'fill-in-blank' && !newQuestion.correctAnswer) {
      alert('Please select a correct answer');
      return;
    }

    if (editingIndex !== null) {
      onUpdateQuestion(editingIndex, newQuestion);
      setEditingIndex(null);
    } else {
      onAddQuestion({
        ...newQuestion,
        id: Date.now().toString(),
      });
    }

    setNewQuestion({
      text: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
    });
  };

  const handleEditQuestion = (index) => {
    setNewQuestion(questions[index]);
    setEditingIndex(index);
  };

  return (
    <div className="question-editor-container">
      <div className="editor-card">
        <h2 className="editor-title">
          {editingIndex !== null ? (
            <>
              <FiArrowLeft className="back-icon" onClick={() => {
                setEditingIndex(null);
                setNewQuestion({
                  text: '',
                  type: 'multiple-choice',
                  options: ['', '', '', ''],
                  correctAnswer: '',
                  points: 1,
                });
              }} />
              Edit Question
            </>
          ) : 'Add New Question'}
        </h2>
        
        <div className="question-form">
          <div className="form-group">
            <label htmlFor="question-text">Question Text</label>
            <textarea
              id="question-text"
              name="text"
              value={newQuestion.text}
              onChange={handleQuestionChange}
              rows="3"
              required
              className="form-textarea"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="question-type">Question Type</label>
              <select
                id="question-type"
                name="type"
                value={newQuestion.type}
                onChange={handleQuestionChange}
                className="form-select"
              >
                {questionTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="question-points">Points</label>
              <input
                type="number"
                id="question-points"
                name="points"
                min="1"
                value={newQuestion.points}
                onChange={handleQuestionChange}
                className="form-input"
              />
            </div>
          </div>
          
          {(newQuestion.type === 'multiple-choice' || newQuestion.type === 'true-false') && (
            <div className="options-section">
              <label>Options</label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="option-item">
                  <div className="option-controls">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={newQuestion.correctAnswer === option}
                      onChange={() => setNewQuestion(prev => ({ ...prev, correctAnswer: option }))}
                      disabled={!option.trim()}
                      className="option-radio"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="option-input"
                    />
                    {newQuestion.options.length > 2 && (
                      <button
                        type="button"
                        className="remove-option-btn"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {newQuestion.options.length < 6 && newQuestion.type === 'multiple-choice' && (
                <button
                  type="button"
                  className="add-option-btn"
                  onClick={handleAddOption}
                >
                  <FiPlus /> Add Option
                </button>
              )}
            </div>
          )}
          
          {newQuestion.type === 'fill-in-blank' && (
            <div className="form-group">
              <label htmlFor="correct-answer">Correct Answer</label>
              <input
                type="text"
                id="correct-answer"
                name="correctAnswer"
                value={newQuestion.correctAnswer}
                onChange={handleQuestionChange}
                required
                className="form-input"
              />
            </div>
          )}
          
          <div className="question-form-actions">
            <button
              type="button"
              className="submit-question-btn"
              onClick={handleSubmitQuestion}
            >
              <FiCheck /> {editingIndex !== null ? 'Update Question' : 'Add Question'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="questions-list-card">
        <h3>Questions ({questions.length})</h3>
        {questions.length > 0 ? (
          <ul className="questions-list">
            {questions.map((question, index) => (
              <li key={question.id || index} className="question-item">
                <div className="question-content">
                  <div className="question-meta">
                    <span className="question-number">{index + 1}.</span>
                    <span className="question-type-badge">{question.type.replace(/-/g, ' ')}</span>
                    <span className="question-points">{question.points} pt{question.points !== 1 ? 's' : ''}</span>
                  </div>
                  <p className="question-text">{question.text}</p>
                </div>
                <div className="question-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEditQuestion(index)}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemoveQuestion(index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-questions">
            <p>No questions added yet</p>
            <p className="hint">Start by adding your first question above</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionEditor;