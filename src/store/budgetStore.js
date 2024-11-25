import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBudgetStore = create(
  persist(
    (set) => ({
      budgets: [],
      categories: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Others'],
      transactions: [],
      savings: [],
      
      addBudget: (budget) => 
        set((state) => ({ budgets: [...state.budgets, { ...budget, id: Date.now() }] })),
      
      deleteBudget: (id) =>
        set((state) => ({ budgets: state.budgets.filter(budget => budget.id !== id) })),
      
      addTransaction: (transaction) =>
        set((state) => ({ transactions: [...state.transactions, { ...transaction, id: Date.now() }] })),
      
      addSaving: (saving) =>
        set((state) => ({ savings: [...state.savings, { ...saving, id: Date.now() }] })),
      
      updateBudget: (id, updatedBudget) =>
        set((state) => ({
          budgets: state.budgets.map(budget =>
            budget.id === id ? { ...budget, ...updatedBudget } : budget
          )
        })),
      
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
    }),
    {
      name: 'budget-storage',
    }
  )
);

export default useBudgetStore;