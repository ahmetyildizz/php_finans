import React from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import { format, addDays } from 'date-fns';

function BillReminders() {
  const upcomingBills = [
    {
      id: 1,
      name: 'Electricity Bill',
      amount: 85.50,
      dueDate: addDays(new Date(), 5),
      status: 'pending',
      category: 'Utilities'
    },
    {
      id: 2,
      name: 'Internet Bill',
      amount: 59.99,
      dueDate: addDays(new Date(), 8),
      status: 'pending',
      category: 'Utilities'
    },
    {
      id: 3,
      name: 'Credit Card Payment',
      amount: 450.00,
      dueDate: addDays(new Date(), 12),
      status: 'pending',
      category: 'Credit Cards'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'green';
      case 'pending': return 'yellow';
      case 'overdue': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Upcoming Bills</Title>
        <Button size="sm" color="blue">Add Bill</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Bill Name</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upcomingBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.name}</TableCell>
              <TableCell>${bill.amount.toFixed(2)}</TableCell>
              <TableCell>{format(bill.dueDate, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{bill.category}</TableCell>
              <TableCell>
                <Badge color={getStatusColor(bill.status)}>
                  {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="xs" color="green">Mark Paid</Button>
                  <Button size="xs" variant="secondary" color="red">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BillReminders;