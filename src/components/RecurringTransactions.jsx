import React from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import useBudgetStore from '../store/budgetStore';

function RecurringTransactions() {
  const { recurringTransactions, addRecurringTransaction, deleteRecurringTransaction } = useBudgetStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Recurring Transactions</Title>
        <Button size="sm" color="blue">Add New</Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Frequency</TableHeaderCell>
            <TableHeaderCell>Next Due</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Netflix Subscription</TableCell>
            <TableCell>$14.99</TableCell>
            <TableCell>Monthly</TableCell>
            <TableCell>Dec 15, 2023</TableCell>
            <TableCell>
              <Badge color="green">Active</Badge>
            </TableCell>
            <TableCell>
              <Button size="xs" variant="secondary" color="red">Delete</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rent Payment</TableCell>
            <TableCell>$1,200.00</TableCell>
            <TableCell>Monthly</TableCell>
            <TableCell>Jan 1, 2024</TableCell>
            <TableCell>
              <Badge color="green">Active</Badge>
            </TableCell>
            <TableCell>
              <Button size="xs" variant="secondary" color="red">Delete</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default RecurringTransactions;