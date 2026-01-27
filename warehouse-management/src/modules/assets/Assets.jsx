import React from 'react';
import { Plus, Filter, Download, Scan } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Assets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="purple" icon={Plus}>
            Add Asset
          </Button>
          <Button variant="primary" icon={Scan}>
            Scan QR Code
          </Button>
          <Button variant="outline" icon={Filter}>
            Filter
          </Button>
        </div>
        <Button variant="outline" icon={Download}>
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Tagged Assets</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">In Use</p>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Maintenance</p>
          <p className="text-2xl font-bold text-orange-600">0</p>
        </Card>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asset ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QR Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                  <Scan size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No assets found</p>
                  <p className="text-sm mt-1">Add assets and generate QR codes for tracking</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Assets;