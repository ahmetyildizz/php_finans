import React from 'react';
import { Pie } from 'react-chartjs-2';
import useBudgetStore from '../store/budgetStore';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetChart() {
  const { budgets } = useBudgetStore();

  const data = {
    labels: budgets.map(budget => budget.category),
    datasets: [
      {
        data: budgets.map(budget => budget.amount),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Distribution</h2>
      <div className="h-[400px] flex justify-center items-center">
        {budgets.length > 0 ? (
          <Pie data={data} options={options} />
        ) : (
          <p className="text-gray-500">No budget data available</p>
        )}
      </div>
    </div>
  );
}

export default BudgetChart;