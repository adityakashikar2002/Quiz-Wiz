import { Link } from 'react-router-dom';
import '../styles/pages/notfound.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="home-link">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;