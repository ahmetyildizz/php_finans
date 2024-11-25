import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import useBudgetStore from '../store/budgetStore';

function ReportGenerator() {
  const { budgets, transactions } = useBudgetStore();

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Financial Report', 20, 20);
    
    // Budget Summary
    doc.setFontSize(16);
    doc.text('Budget Summary', 20, 40);
    
    const budgetData = budgets.map(budget => [
      budget.category,
      `$${budget.amount}`,
      new Date(budget.startDate).toLocaleDateString(),
      new Date(budget.endDate).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: 50,
      head: [['Category', 'Amount', 'Start Date', 'End Date']],
      body: budgetData,
    });

    // Transaction Summary
    doc.setFontSize(16);
    doc.text('Recent Transactions', 20, doc.lastAutoTable.finalY + 20);

    const transactionData = transactions.map(transaction => [
      transaction.category,
      `$${transaction.amount}`,
      new Date(transaction.date).toLocaleDateString(),
      transaction.description
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 30,
      head: [['Category', 'Amount', 'Date', 'Description']],
      body: transactionData,
    });

    doc.save('financial-report.pdf');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <button
        onClick={generatePDF}
        className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
      >
        Generate Financial Report
      </button>
    </div>
  );
}

export default ReportGenerator;