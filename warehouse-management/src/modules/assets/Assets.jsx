import React, { useState } from 'react';
import { Plus, Filter, Download, Scan } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import AssetForm from './AssetForm';
import { useWMS } from '../../context/WMSContext';

const Assets = () => {
  const { assets, getStats } = useWMS();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = getStats();

  const handleSuccess = () => {
    console.log('Asset created successfully!');
  };

  const inUseAssets = assets.filter(a => a.status === 'In Use').length;
  const maintenanceAssets = assets.filter(a => a.status === 'Maintenance' || a.status === 'Repair').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="purple" 
            icon={Plus}
            onClick={() => setIsModalOpen(true)}
          >
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
          <p className="text-2xl font-bold text-gray-800">{assets.length}</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Tagged Assets</p>
          <p className="text-2xl font-bold text-green-600">{stats.assetsTagged}</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">In Use</p>
          <p className="text-2xl font-bold text-blue-600">{inUseAssets}</p>
        </Card>
        <Card padding="p-4">
          <p className="text-sm text-gray-500 mb-1">Maintenance</p>
          <p className="text-2xl font-bold text-orange-600">{maintenanceAssets}</p>
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
            <tbody className="bg-white divide-y divide-gray-200">
              {assets.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                    <Scan size={48} className="mx-auto mb-3 opacity-50" />
                    <p>No assets found</p>
                    <p className="text-sm mt-1">Add assets and generate QR codes for tracking</p>
                  </td>
                </tr>
              ) : (
                assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {asset.assetID}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {asset.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.location || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.assignedTo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${asset.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        ${asset.status === 'In Use' ? 'bg-blue-100 text-blue-800' : ''}
                        ${asset.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${asset.status === 'Repair' ? 'bg-orange-100 text-orange-800' : ''}
                        ${asset.status === 'Retired' ? 'bg-gray-100 text-gray-800' : ''}
                      `}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {asset.isTagged ? (
                        <span className="text-green-600">✓ Tagged</span>
                      ) : (
                        <span className="text-gray-400">No QR</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Asset"
        size="lg"
      >
        <AssetForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
};

export default Assets;