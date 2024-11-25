import React from 'react';
import { Card, Title, TextInput, Select, SelectItem, Button, Switch } from '@tremor/react';
import useBudgetStore from '../../store/budgetStore';

function SystemSettings() {
  const { settings, updateSettings } = useBudgetStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSettings = Object.fromEntries(formData.entries());
    updateSettings(newSettings);
  };

  return (
    <div className="p-6">
      <Title>System Settings</Title>
      
      <Card className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Site Name</label>
            <TextInput
              name="siteName"
              defaultValue={settings?.siteName}
              placeholder="Enter site name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Default Currency</label>
            <Select name="defaultCurrency" defaultValue={settings?.defaultCurrency}>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">SMTP Settings</label>
            <TextInput
              name="smtpHost"
              defaultValue={settings?.smtpHost}
              placeholder="SMTP Host"
            />
            <TextInput
              name="smtpUser"
              defaultValue={settings?.smtpUser}
              placeholder="SMTP User"
            />
            <TextInput
              type="password"
              name="smtpPassword"
              placeholder="SMTP Password"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              name="maintenanceMode"
              defaultChecked={settings?.maintenanceMode}
            />
            <label className="text-sm font-medium">Maintenance Mode</label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              name="enableRegistration"
              defaultChecked={settings?.enableRegistration}
            />
            <label className="text-sm font-medium">Enable User Registration</label>
          </div>

          <Button type="submit" color="blue">
            Save Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default SystemSettings;