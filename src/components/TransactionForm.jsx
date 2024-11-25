import React from 'react';
import { useForm } from 'react-hook-form';
import useBudgetStore from '../store/budgetStore';
import { toast } from 'react-toastify';

function TransactionForm() {
  const { register, handleSubmit, reset } = useForm();
  const { addTransaction, categories } = useBudgetStore();

  const onSubmit = (data) => {
    addTransaction({
      ...data,
      amount: parseFloat(data.amount),
      date: new Date().toISOString(),
      type: data.amount > 0 ? 'income' : 'expense'
    });
    toast.success('Transaction added successfully!');
    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount (use negative for expenses)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('amount')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;