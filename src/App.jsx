import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import SystemSettings from './components/admin/SystemSettings';
import AuditLogs from './components/admin/AuditLogs';

import BudgetForm from './components/BudgetForm';
import BudgetList from './components/BudgetList';
import BudgetSummary from './components/BudgetSummary';
import BudgetChart from './components/BudgetChart';
import TransactionForm from './components/TransactionForm';
import SavingsTracker from './components/SavingsTracker';
import ReportGenerator from './components/ReportGenerator';
import InvestmentPortfolio from './components/InvestmentPortfolio';
import RecurringTransactions from './components/RecurringTransactions';
import BillReminders from './components/BillReminders';
import FinancialGoals from './components/FinancialGoals';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="settings" element={<SystemSettings />} />
          <Route path="logs" element={<AuditLogs />} />
        </Route>
        
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Financial Management System</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <BudgetForm />
                <TransactionForm />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <BudgetSummary />
                <SavingsTracker />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <InvestmentPortfolio />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <FinancialGoals />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <RecurringTransactions />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <BillReminders />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <BudgetChart />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <BudgetList />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <ReportGenerator />
              </div>
            </div>
          </div>
        } />
      </Routes>
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;