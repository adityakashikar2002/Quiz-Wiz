// import { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import LoadingSpinner from './components/shared/LoadingSpinner';
// import ProtectedRoute from './components/auth/ProtectedRoute';

// const LandingPage = lazy(() => import('./pages/LandingPage'));
// const LoginPage = lazy(() => import('./pages/LoginPage'));
// const SignupPage = lazy(() => import('./pages/SignupPage'));
// const DashboardPage = lazy(() => import('./pages/DashboardPage'));
// const CreateQuizPage = lazy(() => import('./pages/CreateQuizPage'));
// const PlayQuizPage = lazy(() => import('./pages/PlayQuizPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// const AppRoutes = () => {
//   return (
//     <Suspense fallback={<LoadingSpinner />}>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
//         <Route path="/create-quiz" element={<ProtectedRoute><CreateQuizPage /></ProtectedRoute>} />
//         <Route path="/quiz/:quizId" element={<ProtectedRoute><PlayQuizPage /></ProtectedRoute>} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default AppRoutes;

// src/routes.js
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/shared/LoadingSpinner';
import ProtectedRoute from './components/auth/ProtectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CreateQuizPage = lazy(() => import('./pages/CreateQuizPage'));
const PlayQuizPage = lazy(() => import('./pages/PlayQuizPage'));
const QuizzesPage = lazy(() => import('./pages/QuizzesPage'));
const QuizFeedbackPage = lazy(() => import('./components/quiz/QuizFeebackPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/create-quiz" element={<ProtectedRoute><CreateQuizPage /></ProtectedRoute>} />
        <Route path="/quiz/:quizId" element={<PlayQuizPage />} />
        <Route path="/quiz/:quizId/feedback" element={<ProtectedRoute><QuizFeedbackPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;