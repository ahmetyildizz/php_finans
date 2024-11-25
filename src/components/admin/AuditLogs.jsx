import React from 'react';
import { Card, Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import { format } from 'date-fns';
import useBudgetStore from '../../store/budgetStore';

function AuditLogs() {
  const { auditLogs } = useBudgetStore();

  const getActionColor = (action) => {
    switch (action) {
      case 'create': return 'green';
      case 'update': return 'blue';
      case 'delete': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6">
      <Title>Audit Logs</Title>
      
      <Card className="mt-6">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Resource</TableHeaderCell>
              <TableHeaderCell>Details</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auditLogs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  {format(new Date(log.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </TableCell>
                <TableCell>{log.userName}</TableCell>
                <TableCell>
                  <Badge color={getActionColor(log.action)}>
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">
                    {log.details}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default AuditLogs;