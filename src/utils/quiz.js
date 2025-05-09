// import { saveToLocalStorage, getFromLocalStorage } from './storage';

// const QUIZZES_KEY = 'quizAppAllQuizzes';
// const RESULTS_KEY = 'quizAppAllResults';

// // Initialize with some demo quizzes if none exist
// const initializeQuizzes = () => {
//   const quizzes = getFromLocalStorage(QUIZZES_KEY);
//   if (!quizzes || quizzes.length === 0) {
//     const demoQuizzes = [
//       {
//         id: '1',
//         title: 'General Knowledge',
//         description: 'Test your general knowledge with this quiz',
//         creatorId: '1',
//         questions: [
//           {
//             id: '1',
//             text: 'What is the capital of France?',
//             type: 'multiple-choice',
//             options: ['London', 'Paris', 'Berlin', 'Madrid'],
//             correctAnswer: 'Paris',
//             points: 1,
//           },
//           {
//             id: '2',
//             text: 'Which planet is known as the Red Planet?',
//             type: 'multiple-choice',
//             options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
//             correctAnswer: 'Mars',
//             points: 1,
//           }
//         ],
//         createdAt: new Date().toISOString(),
//         timeLimit: 300, // 5 minutes in seconds
//         passingScore: 50,
//       }
//     ];
//     saveToLocalStorage(QUIZZES_KEY, demoQuizzes);
//   }
// };

// initializeQuizzes();

// export const createQuiz = async (quizData, creatorId) => {
//   const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
//   const newQuiz = {
//     id: Date.now().toString(),
//     ...quizData,
//     creatorId,
//     createdAt: new Date().toISOString(),
//   };

//   saveToLocalStorage(QUIZZES_KEY, [...quizzes, newQuiz]);
//   return newQuiz;
// };

// export const getQuizzes = async (creatorId = null) => {
//   const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
//   if (creatorId) {
//     return quizzes.filter(quiz => quiz.creatorId === creatorId);
//   }
//   return quizzes;
// };

// export const getQuizById = async (quizId) => {
//   const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
//   const quiz = quizzes.find(q => q.id === quizId);
//   if (!quiz) {
//     throw new Error('Quiz not found');
//   }
//   return quiz;
// };

// export const submitQuiz = async (quizId, userId, answers) => {
//   const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
//   const quiz = quizzes.find(q => q.id === quizId);
//   if (!quiz) {
//     throw new Error('Quiz not found');
//   }

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

//   const percentage = Math.round((score / quiz.questions.reduce((sum, q) => sum + q.points, 0)) * 100);
//   const passed = percentage >= quiz.passingScore;

//   const result = {
//     id: Date.now().toString(),
//     quizId,
//     quizTitle: quiz.title,
//     userId,
//     score,
//     maxScore: quiz.questions.reduce((sum, q) => sum + q.points, 0),
//     percentage,
//     passed,
//     results,
//     submittedAt: new Date().toISOString(),
//     timeTaken: answers.timeTaken || 0,
//   };

//   const allResults = getFromLocalStorage(RESULTS_KEY) || [];
//   saveToLocalStorage(RESULTS_KEY, [...allResults, result]);
//   return result;
// };

// export const getQuizResults = async (userId = null, quizId = null) => {
//   const results = getFromLocalStorage(RESULTS_KEY) || [];
//   if (userId && quizId) {
//     return results.filter(r => r.userId === userId && r.quizId === quizId);
//   }
//   if (userId) {
//     return results.filter(r => r.userId === userId);
//   }
//   if (quizId) {
//     return results.filter(r => r.quizId === quizId);
//   }
//   return results;
// };



// src/utils/quiz.js
import { saveToLocalStorage, getFromLocalStorage } from './storage';

const QUIZZES_KEY = 'quizAppAllQuizzes';
const RESULTS_KEY = 'quizAppAllResults';

// Predefined quizzes
const PREDEFINED_QUIZZES = [
  {
    id: 'science-quiz',
    title: 'Science Quiz',
    description: 'Test your knowledge of basic science concepts',
    creatorId: 'system',
    questions: [
      {
        id: 'sci-1',
        text: 'What is the chemical symbol for water?',
        type: 'multiple-choice',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: 'H2O',
        points: 1,
      },
      {
        id: 'sci-2',
        text: 'Which planet is known as the Red Planet?',
        type: 'multiple-choice',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: 'Mars',
        points: 1,
      },
      {
        id: 'sci-3',
        text: 'What is the powerhouse of the cell?',
        type: 'multiple-choice',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cell membrane'],
        correctAnswer: 'Mitochondria',
        points: 1,
      },
      {
        id: 'sci-4',
        text: 'What is the process by which plants make their own food?',
        type: 'multiple-choice',
        options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Fermentation'],
        correctAnswer: 'Photosynthesis',
        points: 2,
      },
      {
        id: 'sci-5',
        text: 'Which part of the human brain controls balance and coordination?',
        type: 'multiple-choice',
        options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Thalamus'],
        correctAnswer: 'Cerebellum',
        points: 2,
      },
      {
        id: 'sci-6',
        text: 'What gas do plants absorb from the atmosphere during photosynthesis?',
        type: 'multiple-choice',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correctAnswer: 'Carbon Dioxide',
        points: 2,
      },
      {
        id: 'sci-7',
        text: 'What type of energy is stored in the bonds of chemical compounds?',
        type: 'multiple-choice',
        options: ['Thermal Energy', 'Kinetic Energy', 'Chemical Energy', 'Nuclear Energy'],
        correctAnswer: 'Chemical Energy',
        points: 2,
      },
      {
        id: 'sci-8',
        text: 'Which organ in the human body is primarily responsible for filtering blood?',
        type: 'multiple-choice',
        options: ['Heart', 'Liver', 'Kidneys', 'Lungs'],
        correctAnswer: 'Kidneys',
        points: 2,
      },
      {
        id: 'sci-9',
        text: 'What is the main function of white blood cells?',
        type: 'multiple-choice',
        options: ['Transport oxygen', 'Clot blood', 'Fight infections', 'Carry nutrients'],
        correctAnswer: 'Fight infections',
        points: 2,
      },
      {
        id: 'sci-10',
        text: 'Which subatomic particle has a negative charge?',
        type: 'multiple-choice',
        options: ['Proton', 'Neutron', 'Electron', 'Nucleus'],
        correctAnswer: 'Electron',
        points: 2,
      }
    ],
    createdAt: new Date().toISOString(),
    timeLimit: 180,
    passingScore: 60,
    difficulty: 'medium'
  },
  {
    id: 'math-puzzle',
    title: 'Math Puzzle',
    description: 'Challenge your logic and problem-solving skills with math puzzles',
    creatorId: 'system',
    questions: [
      {
        id: 'math-1',
        text: 'What comes next in the sequence: 2, 4, 8, 16, ?',
        type: 'multiple-choice',
        options: ['20', '24', '32', '18'],
        correctAnswer: '32',
        points: 2,
      },
      {
        id: 'math-2',
        text: 'If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?',
        type: 'multiple-choice',
        options: ['3', '30', '100', '9'],
        correctAnswer: '3',
        points: 2,
      },
      {
        id: 'math-3',
        text: 'A clock shows the time as 3:15. What is the angle between the hour and the minute hands?',
        type: 'multiple-choice',
        options: ['7.5°', '0°', '30°', '22.5°'],
        correctAnswer: '7.5°',
        points: 2,
      },
      {
        id: 'math-4',
        text: 'What number is missing? 1, 1, 2, 3, 5, 8, __, 21',
        type: 'multiple-choice',
        options: ['12', '13', '14', '15'],
        correctAnswer: '13',
        points: 2,
      },
      {
        id: 'math-5',
        text: 'If you write all the numbers from 1 to 100, how many times does the digit "1" appear?',
        type: 'multiple-choice',
        options: ['10', '11', '20', '21'],
        correctAnswer: '21',
        points: 2,
      },
      {
        id: 'math-6',
        text: 'You have two ropes that each take 60 minutes to burn, but burn non-uniformly. How can you measure 45 minutes?',
        type: 'multiple-choice',
        options: [
          'Light both ends of one rope and one end of the other',
          'Cut one rope in half and light both halves',
          'Light one rope and wait 15 mins',
          'Light both ropes from one end only'
        ],
        correctAnswer: 'Light both ends of one rope and one end of the other',
        points: 3,
      },
      {
        id: 'math-7',
        text: 'A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?',
        type: 'multiple-choice',
        options: ['$0.05', '$0.10', '$0.15', '$0.20'],
        correctAnswer: '$0.05',
        points: 3,
      },
      {
        id: 'math-8',
        text: 'If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
        type: 'multiple-choice',
        options: ['5 minutes', '50 minutes', '25 minutes', '100 minutes'],
        correctAnswer: '5 minutes',
        points: 3,
      }
    ],
    createdAt: new Date().toISOString(),
    timeLimit: 120,
    passingScore: 55,
    difficulty: 'easy'
  },
  {
    id: 'history-challenge',
    title: 'History Challenge',
    description: 'Test your advanced knowledge of Indian and world history',
    creatorId: 'system',
    questions: [
      {
        id: 'hist-1',
        text: 'Who was the first Governor-General of independent India?',
        type: 'multiple-choice',
        options: ['Lord Mountbatten', 'C. Rajagopalachari', 'Jawaharlal Nehru', 'Sardar Patel'],
        correctAnswer: 'Lord Mountbatten',
        points: 3,
      },
      {
        id: 'hist-2',
        text: 'Which ancient Indian ruler sent ambassadors to the court of Augustus Caesar?',
        type: 'multiple-choice',
        options: ['Ashoka', 'Chandragupta Maurya', 'Rudradaman', 'Kanishka'],
        correctAnswer: 'Kanishka',
        points: 3,
      },
      {
        id: 'hist-3',
        text: 'The Treaty of Versailles formally ended which war?',
        type: 'multiple-choice',
        options: ['World War I', 'World War II', 'Franco-Prussian War', 'Cold War'],
        correctAnswer: 'World War I',
        points: 3,
      },
      {
        id: 'hist-4',
        text: 'Which Mughal emperor is known to have been defeated by the Marathas in the Battle of Bhopal (1737)?',
        type: 'multiple-choice',
        options: ['Aurangzeb', 'Bahadur Shah I', 'Muhammad Shah', 'Shah Alam II'],
        correctAnswer: 'Muhammad Shah',
        points: 3,
      },
      {
        id: 'hist-5',
        text: 'Which Indian freedom fighter organized the "Indian Legion" in Germany during World War II?',
        type: 'multiple-choice',
        options: ['Bhagat Singh', 'Chandrashekhar Azad', 'Subhas Chandra Bose', 'Rajguru'],
        correctAnswer: 'Subhas Chandra Bose',
        points: 3,
      },
      {
        id: 'hist-6',
        text: 'Which empire built the famous city of Machu Picchu in the Andes Mountains?',
        type: 'multiple-choice',
        options: ['Aztec', 'Inca', 'Maya', 'Olmec'],
        correctAnswer: 'Inca',
        points: 3,
      },
      {
        id: 'hist-7',
        text: 'In which year was the Battle of Plassey fought?',
        type: 'multiple-choice',
        options: ['1757', '1761', '1748', '1782'],
        correctAnswer: '1757',
        points: 3,
      },
      {
        id: 'hist-8',
        text: 'Who was the Prime Minister of Britain at the time of Indian independence?',
        type: 'multiple-choice',
        options: ['Clement Attlee', 'Winston Churchill', 'Neville Chamberlain', 'Harold Macmillan'],
        correctAnswer: 'Clement Attlee',
        points: 3,
      },
      {
        id: 'hist-9',
        text: 'The Dandi March was started on March 12, 1930, from which location?',
        type: 'multiple-choice',
        options: ['Sabarmati Ashram', 'Wardha', 'Porbandar', 'Ahmedabad'],
        correctAnswer: 'Sabarmati Ashram',
        points: 3,
      },
      {
        id: 'hist-10',
        text: 'Which French military leader rose to prominence during the French Revolution and later became emperor?',
        type: 'multiple-choice',
        options: ['Napoleon Bonaparte', 'Louis XVI', 'Robespierre', 'Danton'],
        correctAnswer: 'Napoleon Bonaparte',
        points: 3,
      },
      {
        id: 'hist-11',
        text: 'The “Quit India Movement” was launched in which year?',
        type: 'multiple-choice',
        options: ['1930', '1935', '1942', '1947'],
        correctAnswer: '1942',
        points: 3,
      },
      {
        id: 'hist-12',
        text: 'The "Battle of Haldighati" was fought between which two leaders?',
        type: 'multiple-choice',
        options: ['Rana Sanga and Babur', 'Maharana Pratap and Akbar', 'Shivaji and Aurangzeb', 'Ashoka and Kalinga'],
        correctAnswer: 'Maharana Pratap and Akbar',
        points: 3,
      },
      {
        id: 'hist-13',
        text: 'Who discovered the sea route to India in 1498?',
        type: 'multiple-choice',
        options: ['Christopher Columbus', 'Vasco da Gama', 'Ferdinand Magellan', 'Marco Polo'],
        correctAnswer: 'Vasco da Gama',
        points: 3,
      },
      {
        id: 'hist-14',
        text: 'Which Indian leader was known as the "Frontier Gandhi"?',
        type: 'multiple-choice',
        options: ['Maulana Abul Kalam Azad', 'Khan Abdul Ghaffar Khan', 'Lala Lajpat Rai', 'Bal Gangadhar Tilak'],
        correctAnswer: 'Khan Abdul Ghaffar Khan',
        points: 3,
      },
      {
        id: 'hist-15',
        text: 'Who was the President of the United States during the Cuban Missile Crisis?',
        type: 'multiple-choice',
        options: ['Dwight D. Eisenhower', 'John F. Kennedy', 'Richard Nixon', 'Harry S. Truman'],
        correctAnswer: 'John F. Kennedy',
        points: 3,
      }
    ],
    createdAt: new Date().toISOString(),
    timeLimit: 300,
    passingScore: 70,
    difficulty: 'hard'
  },
  {
      "id": "programming-quiz-1",
      "title": "Programming Fundamentals",
      "description": "Test your basic programming knowledge.",
      "creatorId": "system",
      "questions": [
        {
          "id": "prog-1-1",
          "text": "What does CPU stand for?",
          "type": "multiple-choice",
          "options": ["Central Processing Unit", "Computer Programming Unit", "Control Process Unit", "Common Performance Utility"],
          "correctAnswer": "Central Processing Unit",
          "points": 1
        },
        {
          "id": "prog-1-2",
          "text": "True or False: A variable is used to store data in a program.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 1
        },
        {
          "id": "prog-1-3",
          "text": "Which of the following is NOT a fundamental data type in most programming languages?",
          "type": "multiple-choice",
          "options": ["Integer", "Boolean", "Character", "Algorithm"],
          "correctAnswer": "Algorithm",
          "points": 1
        },
        {
          "id": "prog-1-4",
          "text": "What is the purpose of a loop in programming?",
          "type": "fill-in-blank",
          "correctAnswer": "repeat a block of code",
          "points": 2
        },
        {
          "id": "prog-1-5",
          "text": "Which of the following is an example of a conditional statement?",
          "type": "multiple-choice",
          "options": ["for loop", "while loop", "if-else", "variable declaration"],
          "correctAnswer": "if-else",
          "points": 2
        },
        {
          "id": "prog-1-6",
          "text": "What is the process of finding and fixing errors in a program called?",
          "type": "fill-in-blank",
          "correctAnswer": "debugging",
          "points": 2
        },
        {
          "id": "prog-1-7",
          "text": "True or False: An array is a collection of elements of the same data type.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 2
        },
        {
          "id": "prog-1-8",
          "text": "Which programming paradigm focuses on objects and their interactions?",
          "type": "multiple-choice",
          "options": ["Procedural Programming", "Functional Programming", "Object-Oriented Programming", "Logical Programming"],
          "correctAnswer": "Object-Oriented Programming",
          "points": 2
        },
        {
          "id": "prog-1-9",
          "text": "What is the role of a function (or method) in programming?",
          "type": "fill-in-blank",
          "correctAnswer": "perform a specific task",
          "points": 3
        },
        {
          "id": "prog-1-10",
          "text": "Which of the following is a high-level programming language?",
          "type": "multiple-choice",
          "options": ["Assembly Language", "Machine Code", "C++", "Binary Code"],
          "correctAnswer": "C++",
          "points": 3
        }
      ],
      "createdAt": "2025-05-09T09:35:05.000Z",
      "timeLimit": 300,
      "passingScore": 70,
      "difficulty": "medium"
    },
    {
      "id": "current-affairs-quiz-1",
      "title": "Recent Global Events",
      "description": "Test your awareness of recent current affairs.",
      "creatorId": "system",
      "questions": [
        {
          "id": "ca-1-1",
          "text": "As of May 2025, who is the Secretary-General of the United Nations?",
          "type": "fill-in-blank",
          "correctAnswer": "António Guterres",
          "points": 1
        },
        {
          "id": "ca-1-2",
          "text": "True or False: The International Space Station (ISS) is scheduled for decommissioning before the year 2030.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 1
        },
        {
          "id": "ca-1-3",
          "text": "Which country recently hosted the G7 summit in early 2025?",
          "type": "multiple-choice",
          "options": ["United States", "Canada", "Japan", "Italy"],
          "correctAnswer": "Italy",
          "points": 2
        },
        {
          "id": "ca-1-4",
          "text": "What is the name of the major international health organization affiliated with the United Nations?",
          "type": "fill-in-blank",
          "correctAnswer": "World Health Organization",
          "points": 2
        },
        {
          "id": "ca-1-5",
          "text": "Which major sporting event is scheduled to be held in the summer of 2028?",
          "type": "multiple-choice",
          "options": ["FIFA World Cup", "Summer Olympics", "UEFA European Championship", "Commonwealth Games"],
          "correctAnswer": "Summer Olympics",
          "points": 2
        },
        {
          "id": "ca-1-6",
          "text": "True or False: Artificial intelligence (AI) regulations are currently globally standardized.",
          "type": "true-false",
          "correctAnswer": false,
          "points": 2
        },
        {
          "id": "ca-1-7",
          "text": "Which African nation has been facing significant political instability recently?",
          "type": "multiple-choice",
          "options": ["Nigeria", "South Africa", "Sudan", "Kenya"],
          "correctAnswer": "Sudan",
          "points": 3
        },
        {
          "id": "ca-1-8",
          "text": "What is the primary focus of the ongoing COP climate change conferences?",
          "type": "fill-in-blank",
          "correctAnswer": "global climate action",
          "points": 3
        },
        {
          "id": "ca-1-9",
          "text": "Which major technology company launched a new generation of virtual reality headsets in late 2024?",
          "type": "multiple-choice",
          "options": ["Apple", "Microsoft", "Meta", "Google"],
          "correctAnswer": "Meta",
          "points": 3
        },
        {
          "id": "ca-1-10",
          "text": "What is a recent major development in the field of sustainable energy?",
          "type": "fill-in-blank",
          "correctAnswer": "advancements in solar or wind technology",
          "points": 3
        }
      ],
      "createdAt": "2025-05-09T09:35:05.000Z",
      "timeLimit": 180,
      "passingScore": 70,
      "difficulty": "medium"
    },
    {
      "id": "literature-quiz-1",
      "title": "Classic Literature",
      "description": "Test your knowledge of famous literary works.",
      "creatorId": "system",
      "questions": [
        {
          "id": "lit-1-1",
          "text": "Who wrote the play 'Hamlet'?",
          "type": "fill-in-blank",
          "correctAnswer": "William Shakespeare",
          "points": 1
        },
        {
          "id": "lit-1-2",
          "text": "True or False: 'Pride and Prejudice' was written by Jane Austen.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 1
        },
        {
          "id": "lit-1-3",
          "text": "Which novel features the character of Atticus Finch?",
          "type": "multiple-choice",
          "options": ["1984", "To Kill a Mockingbird", "The Great Gatsby", "Brave New World"],
          "correctAnswer": "To Kill a Mockingbird",
          "points": 2
        },
        {
          "id": "lit-1-4",
          "text": "What is the name of Captain Ahab's obsession in 'Moby Dick'?",
          "type": "fill-in-blank",
          "correctAnswer": "Moby Dick",
          "points": 2
        },
        {
          "id": "lit-1-5",
          "text": "'The Old Man and the Sea' was written by which author?",
          "type": "multiple-choice",
          "options": ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
          "correctAnswer": "Ernest Hemingway",
          "points": 2
        },
        {
          "id": "lit-1-6",
          "text": "True or False: 'The Lord of the Rings' is a trilogy of books.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 2
        },
        {
          "id": "lit-1-7",
          "text": "Which famous poem begins with the line 'Whose woods these are I think I know'?",
          "type": "multiple-choice",
          "options": ["The Raven", "Stopping by Woods on a Snowy Evening", "Ode to a Nightingale", "The Love Song of J. Alfred Prufrock"],
          "correctAnswer": "Stopping by Woods on a Snowy Evening",
          "points": 3
        },
        {
          "id": "lit-1-8",
          "text": "Who is the protagonist of George Orwell's 'Animal Farm'?",
          "type": "fill-in-blank",
          "correctAnswer": "Napoleon (the pig)",
          "points": 3
        },
        {
          "id": "lit-1-9",
          "text": "Which of Shakespeare's plays features the tragic love story of Romeo and Juliet?",
          "type": "multiple-choice",
          "options": ["Macbeth", "Othello", "Romeo and Juliet", "King Lear"],
          "correctAnswer": "Romeo and Juliet",
          "points": 3
        },
        {
          "id": "lit-1-10",
          "text": "What is the genre of Mary Shelley's novel 'Frankenstein'?",
          "type": "fill-in-blank",
          "correctAnswer": "Gothic horror",
          "points": 3
        }
      ],
      "createdAt": "2025-05-09T09:35:05.000Z",
      "timeLimit": 270,
      "passingScore": 60,
      "difficulty": "medium"
    },
    {
      "id": "random-knowledge-quiz-1",
      "title": "General Trivia",
      "description": "A mix of questions on various topics.",
      "creatorId": "system",
      "questions": [
        {
          "id": "rand-1-1",
          "text": "What is the chemical symbol for gold?",
          "type": "fill-in-blank",
          "correctAnswer": "Au",
          "points": 1
        },
        {
          "id": "rand-1-2",
          "text": "True or False: The Earth is the third planet from the Sun.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 1
        },
        {
          "id": "rand-1-3",
          "text": "Which country is home to the kangaroo?",
          "type": "multiple-choice",
          "options": ["Brazil", "Australia", "Argentina", "South Africa"],
          "correctAnswer": "Australia",
          "points": 1
        },
        {
          "id": "rand-1-4",
          "text": "What is the capital city of Japan?",
          "type": "fill-in-blank",
          "correctAnswer": "Tokyo",
          "points": 2
        },
        {
          "id": "rand-1-5",
          "text": "Which artist painted the Mona Lisa?",
          "type": "multiple-choice",
          "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
          "correctAnswer": "Leonardo da Vinci",
          "points": 2
        },
        {
          "id": "rand-1-6",
          "text": "True or False: The Pacific Ocean is the largest ocean on Earth.",
          "type": "true-false",
          "correctAnswer": true,
          "points": 2
        },
        {
          "id": "rand-1-7",
          "text": "What is the currency of the United Kingdom?",
          "type": "multiple-choice",
          "options": ["Euro", "Dollar", "Pound Sterling", "Yen"],
          "correctAnswer": "Pound Sterling",
          "points": 2
        },
        {
          "id": "rand-1-8",
          "text": "What is the name of the Earth's natural satellite?",
          "type": "fill-in-blank",
          "correctAnswer": "the Moon",
          "points": 3
        },
        {
          "id": "rand-1-9",
          "text": "Which of the following is a prime number?",
          "type": "multiple-choice",
          "options": ["4", "6", "8", "7"],
          "correctAnswer": "7",
          "points": 3
        },
        {
          "id": "rand-1-10",
          "text": "What is the boiling point of water in Celsius?",
          "type": "fill-in-blank",
          "correctAnswer": "100",
          "points": 3
        }
      ],
      "createdAt": "2025-05-09T09:35:05.000Z",
      "timeLimit": 210,
      "passingScore": 60,
      "difficulty": "easy"
    }


  // Add more predefined quizzes here...
];

// Initialize with some demo quizzes if none exist
const initializeQuizzes = () => {
  const quizzes = getFromLocalStorage(QUIZZES_KEY);
  if (!quizzes || quizzes.length === 0) {
    saveToLocalStorage(QUIZZES_KEY, PREDEFINED_QUIZZES);
  }
};

initializeQuizzes();

export const getPredefinedQuizzes = async () => {
  return PREDEFINED_QUIZZES;
};

// ... rest of the existing functions remain the same ...

export const createQuiz = async (quizData, creatorId) => {
  const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
  const newQuiz = {
    id: Date.now().toString(),
    ...quizData,
    creatorId,
    createdAt: new Date().toISOString(),
  };

  saveToLocalStorage(QUIZZES_KEY, [...quizzes, newQuiz]);
  return newQuiz;
};

export const getQuizzes = async (creatorId = null) => {
  const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
  if (creatorId) {
    return quizzes.filter(quiz => quiz.creatorId === creatorId);
  }
  return quizzes;
};

export const getQuizById = async (quizId) => {
  const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  return quiz;
};

export const submitQuiz = async (quizId, userId, answers) => {
  const quizzes = getFromLocalStorage(QUIZZES_KEY) || [];
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) {
    throw new Error('Quiz not found');
  }

  let score = 0;
  const results = quiz.questions.map(question => {
    const userAnswer = answers[question.id];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      score += question.points;
    }
    return {
      questionId: question.id,
      questionText: question.text,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      points: question.points,
    };
  });

  const percentage = Math.round((score / quiz.questions.reduce((sum, q) => sum + q.points, 0)) * 100);
  const passed = percentage >= quiz.passingScore;

  const result = {
    id: Date.now().toString(),
    quizId,
    quizTitle: quiz.title,
    userId,
    score,
    maxScore: quiz.questions.reduce((sum, q) => sum + q.points, 0),
    percentage,
    passed,
    results,
    submittedAt: new Date().toISOString(),
    timeTaken: answers.timeTaken || 0,
  };

  const allResults = getFromLocalStorage(RESULTS_KEY) || [];
  saveToLocalStorage(RESULTS_KEY, [...allResults, result]);
  return result;
};

export const getQuizResults = async (userId = null, quizId = null) => {
  const results = getFromLocalStorage(RESULTS_KEY) || [];
  if (userId && quizId) {
    return results.filter(r => r.userId === userId && r.quizId === quizId);
  }
  if (userId) {
    return results.filter(r => r.userId === userId);
  }
  if (quizId) {
    return results.filter(r => r.quizId === quizId);
  }
  return results;
};