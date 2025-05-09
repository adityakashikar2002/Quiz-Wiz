import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import '../../styles/components/dashboard.css';

const ProgressChart = ({ results }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (results.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    
    const sortedResults = [...results].sort((a, b) => 
      new Date(a.submittedAt) - new Date(b.submittedAt)
    );

    const labels = sortedResults.map((_, index) => `Quiz ${index + 1}`);
    const data = sortedResults.map(result => result.percentage);
    const quizTitles = sortedResults.map(result => result.quizTitle);
    const passedStatus = sortedResults.map(result => result.passed);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Quiz Performance',
          data,
          borderColor: '#4CAF50',
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(76, 175, 80, 0.3)');
            gradient.addColorStop(1, 'rgba(76, 175, 80, 0.05)');
            return gradient;
          },
          borderWidth: 4,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: (context) => {
            const index = context.dataIndex;
            return passedStatus[index] ? '#4CAF50' : '#F44336';
          },
          pointRadius: 6,
          pointHoverRadius: 10,
          pointBorderWidth: 2,
          pointBorderColor: '#fff',
          pointHitRadius: 15,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(30, 30, 30, 0.95)',
            titleFont: {
              size: 14,
              weight: 'bold',
              family: "'Inter', sans-serif"
            },
            bodyFont: {
              size: 13,
              family: "'Inter', sans-serif"
            },
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              title: (context) => quizTitles[context[0].dataIndex],
              label: (context) => {
                const result = sortedResults[context.dataIndex];
                return [
                  `Score: ${context.parsed.y}%`,
                  `Status: ${result.passed ? 'Passed' : 'Failed'}`,
                  `Date: ${format(new Date(result.submittedAt), 'MMM dd, yyyy')}`
                ];
              },
            }
          },
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#666',
              font: {
                family: "'Inter', sans-serif"
              },
              callback: (value) => `${value}%`,
              stepSize: 20
            }
          },
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#666',
              font: {
                family: "'Inter', sans-serif"
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [results]);

  const trend = results.length > 1 
    ? results[results.length - 1].percentage > results[0].percentage 
      ? 'up' 
      : 'down' 
    : 'neutral';

  return (
    <div className="progress-chart">
      {results.length > 0 && (
        <div className="trend-indicator">
          {trend === 'up' ? (
            <FiTrendingUp className="trend-up" />
          ) : trend === 'down' ? (
            <FiTrendingDown className="trend-down" />
          ) : null}
          <span className="trend-text">
            {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Neutral'}
          </span>
        </div>
      )}
      <canvas ref={chartRef} />
      {results.length === 0 && (
        <div className="no-data-message">
          <p>No quiz results yet</p>
          <small>Take some quizzes to see your progress!</small>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;