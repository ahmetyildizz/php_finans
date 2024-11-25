import React from 'react';
import { Card, Title, BarChart, DonutChart, Metric, Text } from '@tremor/react';
import useBudgetStore from '../../store/budgetStore';

function AdminDashboard() {
  const { users, transactions, budgets } = useBudgetStore();

  const userStats = [
    { name: 'Active Users', value: users?.length || 0 },
    { name: 'Total Transactions', value: transactions?.length || 0 },
    { name: 'Active Budgets', value: budgets?.length || 0 },
  ];

  const transactionData = transactions?.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  const chartData = Object.entries(transactionData || {}).map(([month, amount]) => ({
    month,
    "Total Amount": amount,
  }));

  return (
    <div className="p-6 space-y-6">
      <Title>Admin Dashboard</Title>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userStats.map((stat) => (
          <Card key={stat.name} className="max-w-xs mx-auto">
            <Text>{stat.name}</Text>
            <Metric>{stat.value}</Metric>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Monthly Transaction Overview</Title>
          <BarChart
            data={chartData}
            index="month"
            categories={["Total Amount"]}
            colors={["blue"]}
            className="mt-6"
            yAxisWidth={48}
          />
        </Card>

        <Card>
          <Title>Budget Distribution</Title>
          <DonutChart
            data={budgets || []}
            category="amount"
            index="category"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            className="mt-6"
          />
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;