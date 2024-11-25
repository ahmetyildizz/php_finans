import React from 'react';
import { format } from 'date-fns';
import useBudgetStore from '../store/budgetStore';

function BudgetList() {
  const { budgets, deleteBudget } = useBudgetStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Budget List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {budget.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${budget.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(budget.startDate), 'MMM d, yyyy')} - 
                  {format(new Date(budget.endDate), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  {budget.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteBudget(budget.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BudgetList;