import React from 'react';
import { Plus, Filter, Users as UsersIcon } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="primary" icon={Plus}>
          Add User
        </Button>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Roles</option>
            <option>Administrator</option>
            <option>Warehouse Staff</option>
            <option>Procurement</option>
            <option>Finance</option>
            <option>Viewer</option>
          </select>
          <Button variant="outline" icon={Filter}>
            Filter
          </Button>
        </div>
      </div>

      <Card padding="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                  <UsersIcon size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No users found</p>
                  <p className="text-sm mt-1">Add users to manage system access</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Users;