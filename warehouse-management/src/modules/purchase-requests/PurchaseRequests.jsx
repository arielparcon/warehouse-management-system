import React from 'react';
import { Plus, Filter, Download, FileText } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const PurchaseRequests = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            New Purchase Request
          </Button>
          <Button variant="outline" icon={Filter}>
            Filter
          </Button>
        </div>
        <Button variant="outline" icon={Download}>
          Export
        </Button>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PR Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                  <FileText size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No purchase requests found</p>
                  <p className="text-sm mt-1">Click "New Purchase Request" to create one</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PurchaseRequests;