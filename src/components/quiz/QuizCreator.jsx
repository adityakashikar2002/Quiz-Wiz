import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext';
import QuestionEditor from './QuestionEditor';
import QRCodeGenerator from '../shared/QRCodeGenerator';
import Modal from '../shared/Modal';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import '../../styles/components/quiz.css';

const QuizCreator = () => {
  const { createQuiz } = useQuiz();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: 300,
    passingScore: 50,
    difficulty: 'medium',
    questions: [],
  });
  const [showQRModal, setShowQRModal] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({
      ...prev,
      [name]: name === 'timeLimit' || name === 'passingScore' 
        ? parseInt(value, 10) 
        : value,
    }));
  };

  // const addQuestion = (question) => {
  //   setQuizData(prev => ({
  //     ...prev,
  //     questions: [...prev.questions, question],
  //   }));
  // };

  const addQuestion = (question) => {
    // Ensure each question has all required fields
    const completeQuestion = {
      id: question.id || Date.now().toString(), // Ensure ID exists
      text: question.text,
      type: question.type,
      options: question.options || [], // For multiple-choice
      correctAnswer: question.correctAnswer,
      points: question.points || 1, // Default to 1 point if not specified
    };
    
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, completeQuestion],
    }));
  };

  const updateQuestion = (index, updatedQuestion) => {
    setQuizData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = updatedQuestion;
      return { ...prev, questions: newQuestions };
    });
  };

  const removeQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (quizData.questions.length === 0) {
  //     alert('Please add at least one question');
  //     return;
  //   }
  //   try {
  //     const newQuiz = await createQuiz(quizData);
  //     setCreatedQuizId(newQuiz.id);
  //     setShowQRModal(true);
  //   } catch (error) {
  //     console.error('Error creating quiz:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate questions
    const validatedQuestions = quizData.questions.map(q => ({
      id: q.id || Date.now().toString(),
      text: q.text,
      type: q.type,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      points: Number(q.points) || 1, // Default points
    }));
    
    try {
      const newQuiz = await createQuiz({
        ...quizData,
        questions: validatedQuestions, // Use validated questions
      });
      setCreatedQuizId(newQuiz.id);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="quiz-creator-container">
      <div className="creator-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1 className="creator-title">Create a New Quiz</h1>
      </div>
      
      <div className="creator-content">
        <div className="quiz-meta-card">
          <h2 className="section-title">Quiz Information</h2>
          <form className="quiz-meta-form">
            <div className="form-group">
              <label htmlFor="title">Quiz Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={quizData.description}
                onChange={handleInputChange}
                rows="3"
                className="form-textarea"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="timeLimit">Time Limit (minutes)</label>
                <input
                  type="number"
                  id="timeLimit"
                  name="timeLimit"
                  min="1"
                  value={quizData.timeLimit / 60}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'timeLimit',
                      value: parseInt(e.target.value, 10) * 60,
                    }
                  })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="passingScore">Passing Score (%)</label>
                <input
                  type="number"
                  id="passingScore"
                  name="passingScore"
                  min="1"
                  max="100"
                  value={quizData.passingScore}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={quizData.difficulty}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        
        <QuestionEditor
          questions={quizData.questions}
          onAddQuestion={addQuestion}
          onUpdateQuestion={updateQuestion}
          onRemoveQuestion={removeQuestion}
        />
        
        <div className="creator-actions">
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="create-btn"
            onClick={handleSubmit}
            disabled={quizData.questions.length === 0}
          >
            <FiCheck /> Create Quiz
          </button>
        </div>
      </div>
      
      <Modal 
        isOpen={showQRModal} 
        onClose={() => {
          setShowQRModal(false);
          navigate('/dashboard');
        }}
        title="Quiz Created Successfully!"
      >
        <QRCodeGenerator 
          url={`${window.location.origin}/quiz/${createdQuizId}`} 
          note="Scan this QR code or share the link to distribute your quiz"
        />
      </Modal>
    </div>
  );
};

export default QuizCreator;