import React from 'react';
import { Line } from 'react-chartjs-2';
import useBudgetStore from '../store/budgetStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SavingsTracker() {
  const { savings, transactions } = useBudgetStore();
  
  const totalSavings = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: savings.map(s => new Date(s.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Savings Over Time',
        data: savings.map(s => s.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Savings Progress'
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Savings Overview</h2>
      <div className="mb-6">
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="text-sm text-teal-600">Total Savings</p>
          <p className="text-2xl font-bold text-teal-800">${totalSavings.toFixed(2)}</p>
        </div>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default SavingsTracker;