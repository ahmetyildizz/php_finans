import React, { useState } from 'react';
import { Card, Title, ProgressBar, Text, Metric, Button, Badge, Dialog } from '@tremor/react';
import { toast } from 'react-toastify';
import axios from 'axios';

function FinancialGoals() {
  const [goals, setGoals] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    current_amount: '',
    deadline: '',
    category: 'Savings'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/goals/create.php', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setGoals(prev => [...prev, { ...formData, id: response.data.id }]);
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        target_amount: '',
        current_amount: '',
        deadline: '',
        category: 'Savings'
      });
      toast.success('Goal added successfully!');
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  const handleEditGoal = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/goals/update.php?id=${selectedGoal.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setGoals(prev => prev.map(goal => 
        goal.id === selectedGoal.id ? { ...goal, ...formData } : goal
      ));
      setIsEditModalOpen(false);
      setSelectedGoal(null);
      toast.success('Goal updated successfully!');
    } catch (error) {
      toast.error('Failed to update goal');
    }
  };

  const handleDeleteGoal = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axios.delete(`/api/goals/delete.php?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        setGoals(prev => prev.filter(goal => goal.id !== id));
        toast.success('Goal deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete goal');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <Title>Financial Goals</Title>
        <Button size="sm" color="blue" onClick={() => setIsAddModalOpen(true)}>
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          
          return (
            <Card key={goal.id}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Text>{goal.name}</Text>
                  <Metric>${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}</Metric>
                </div>
                <div className="flex space-x-2">
                  <Badge color="blue">{goal.category}</Badge>
                  <Button 
                    size="xs" 
                    variant="secondary" 
                    onClick={() => {
                      setSelectedGoal(goal);
                      setFormData(goal);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="xs" 
                    variant="secondary" 
                    color="red"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              <ProgressBar value={progress} color="blue" className="mt-3" />
              
              <div className="flex justify-between items-center mt-4">
                <Text className="text-sm text-gray-500">
                  Target Date: {new Date(goal.deadline).toLocaleDateString()}
                </Text>
                <Text className="text-sm font-medium">
                  {progress.toFixed(1)}% Complete
                </Text>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="p-6">
          <Title>Add New Goal</Title>
          <form onSubmit={handleAddGoal} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Amount</label>
              <input
                type="number"
                name="target_amount"
                value={formData.target_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Amount</label>
              <input
                type="number"
                name="current_amount"
                value={formData.current_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Purchase">Purchase</option>
                <option value="Debt">Debt</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="blue">
                Add Goal
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Edit Goal Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div className="p-6">
          <Title>Edit Goal</Title>
          <form onSubmit={handleEditGoal} className="mt-4 space-y-4">
            {/* Same form fields as Add Modal */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Amount</label>
              <input
                type="number"
                name="target_amount"
                value={formData.target_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Current Amount</label>
              <input
                type="number"
                name="current_amount"
                value={formData.current_amount}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Purchase">Purchase</option>
                <option value="Debt">Debt</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" color="blue">
                Update Goal
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default FinancialGoals;