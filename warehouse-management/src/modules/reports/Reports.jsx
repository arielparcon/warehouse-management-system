import React from 'react';
import { Package, FileText, ShoppingCart, Scan, Archive, BarChart3 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const Reports = () => {
  const reportTypes = [
    {
      title: 'Inventory Report',
      description: 'Current stock levels and valuation',
      icon: Package
    },
    {
      title: 'PR Status Report',
      description: 'Purchase request tracking and aging',
      icon: FileText
    },
    {
      title: 'PO Report',
      description: 'Purchase order status and fulfillment',
      icon: ShoppingCart
    },
    {
      title: 'Asset Report',
      description: 'Asset inventory and lifecycle tracking',
      icon: Scan
    },
    {
      title: 'Audit Trail Report',
      description: 'User activity and transaction history',
      icon: Archive
    },
    {
      title: 'Custom Report',
      description: 'Build your own custom reports',
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index} padding="p-6" className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">{report.title}</h4>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="Generate Report">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select report type</option>
              <option>Inventory Report</option>
              <option>PR Status Report</option>
              <option>PO Report</option>
              <option>Asset Report</option>
              <option>Audit Trail Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom range</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="primary">
            Generate Report
          </Button>
          <Button variant="outline">
            Schedule Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;