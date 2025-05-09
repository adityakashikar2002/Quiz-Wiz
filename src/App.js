import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Toast from './components/shared/Toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
            <Toast />
          </div>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;