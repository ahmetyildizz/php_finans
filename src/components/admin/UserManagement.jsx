import React, { useState } from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import useBudgetStore from '../../store/budgetStore';

function UserManagement() {
  const { users, updateUser, deleteUser } = useBudgetStore();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleStatusChange = (userId) => {
    const user = users.find(u => u.id === userId);
    updateUser(userId, { ...user, status: user.status === 'active' ? 'inactive' : 'active' });
  };

  const handleRoleChange = (userId) => {
    const user = users.find(u => u.id === userId);
    updateUser(userId, { ...user, role: user.role === 'admin' ? 'user' : 'admin' });
  };

  return (
    <div className="p-6">
      <Title>User Management</Title>
      
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    color={user.role === 'admin' ? 'red' : 'blue'}
                    onClick={() => handleRoleChange(user.id)}
                    className="cursor-pointer"
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    color={user.status === 'active' ? 'green' : 'gray'}
                    onClick={() => handleStatusChange(user.id)}
                    className="cursor-pointer"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="xs"
                    variant="secondary"
                    color="red"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default UserManagement;