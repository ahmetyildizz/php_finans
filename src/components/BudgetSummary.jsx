import React from 'react';
import useBudgetStore from '../store/budgetStore';

function BudgetSummary() {
  const { budgets } = useBudgetStore();
  const totalBudget = budgets.reduce((sum, budget) => sum + Number(budget.amount), 0);
  const activeBudgets = budgets.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600">Total Budget</p>
          <p className="text-2xl font-bold text-blue-800">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600">Active Budgets</p>
          <p className="text-2xl font-bold text-green-800">{activeBudgets}</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetSummary;