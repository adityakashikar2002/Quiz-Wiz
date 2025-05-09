// import { format } from 'date-fns';
// import { FiCheckCircle, FiXCircle, FiChevronRight } from 'react-icons/fi';
// import '../../styles/components/dashboard.css';

// const RecentActivity = ({ results }) => {
//   const recentResults = [...results]
//     .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
//     .slice(0, 10); // Increased to show more items

//   return (
//     <div className="recent-activity">
//       {recentResults.length > 0 ? (
//         <div className="activity-scroll-container">
//           <ul className="activity-list">
//             {recentResults.map((result, index) => (
//               <li key={index} className="activity-item">
//                 <div className={`activity-icon ${result.passed ? 'passed' : 'failed'}`}>
//                   {result.passed ? <FiCheckCircle /> : <FiXCircle />}
//                 </div>
//                 <div className="activity-details">
//                   <h4>{result.quizTitle}</h4>
//                   <p>
//                     <span className={`score ${result.passed ? 'passed' : 'failed'}`}>
//                       {result.percentage}%
//                     </span> • 
//                     {format(new Date(result.submittedAt), 'MMM dd, yyyy')}
//                   </p>
//                 </div>
//                 {/* <div className="activity-arrow">
//                   <FiChevronRight />
//                 </div> */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="no-activity">
//           <p>No recent activity</p>
//           <small>Take a quiz to get started!</small>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentActivity;




// src/components/dashboard/RecentActivity.jsx
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import '../../styles/components/dashboard.css';

const RecentActivity = ({ results }) => {
  const recentResults = [...results]
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    .slice(0, 10);

  return (
    <div className="recent-activity">
      {recentResults.length > 0 ? (
        <div className="activity-scroll-container">
          <ul className="activity-list">
            {recentResults.map((result, index) => (
              <Link 
                key={index} 
                to={`/quiz/${result.quizId}/feedback`}
                className="activity-link"
              >
                <li className="activity-item">
                  <div className={`activity-icon ${result.passed ? 'passed' : 'failed'}`}>
                    {result.passed ? <FiCheckCircle /> : <FiXCircle />}
                  </div>
                  <div className="activity-details">
                    <h4>{result.quizTitle}</h4>
                    <p>
                      <span className={`score ${result.passed ? 'passed' : 'failed'}`}>
                        {result.percentage}%
                      </span> • 
                      {format(new Date(result.submittedAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-activity">
          <p>No recent activity</p>
          <small>Take a quiz to get started!</small>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;