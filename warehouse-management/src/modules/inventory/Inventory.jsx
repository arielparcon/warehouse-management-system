import React from 'react';
import { Plus, Filter, Download, Package } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus}>
            Add Item
          </Button>
          <Button variant="outline" icon={Filter}>
            Filter
          </Button>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Computers</option>
            <option>Printers</option>
            <option>Hardware</option>
          </select>
        </div>
        <Button variant="outline" icon={Download}>
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">0</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Low Stock Items</p>
          <p className="text-2xl font-bold text-orange-600">0</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">0</p>
        </Card>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                  <Package size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No inventory items found</p>
                  <p className="text-sm mt-1">Add items to start tracking inventory</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Inventory;