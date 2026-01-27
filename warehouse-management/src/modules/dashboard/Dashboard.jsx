import React from 'react';
import { Package, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const stats = [
    { label: 'Total Inventory Items', value: '0', color: 'blue' },
    { label: 'Pending PRs', value: '0', color: 'yellow' },
    { label: 'Active POs', value: '0', color: 'green' },
    { label: 'Assets Tagged', value: '0', color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} padding="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Activity" className="lg:col-span-2">
          <div className="text-center py-12 text-gray-400">
            <Clock size={48} className="mx-auto mb-3 opacity-50" />
            <p>No recent activities</p>
          </div>
        </Card>

        <Card title="Quick Actions">
          <div className="space-y-3">
            <Button variant="primary" className="w-full justify-center">
              Create Purchase Request
            </Button>
            <Button variant="success" className="w-full justify-center">
              Receive Items
            </Button>
            <Button variant="purple" className="w-full justify-center">
              Generate QR Code
            </Button>
            <Button variant="secondary" className="w-full justify-center">
              Export Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;