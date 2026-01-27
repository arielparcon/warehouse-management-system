import StorageService from './storageService';

const ASSET_PREFIX = 'asset:';

const AssetService = {
  // Generate unique asset ID
  generateAssetID(category) {
    const timestamp = Date.now();
    const categoryCode = category.substring(0, 3).toUpperCase();
    return `${categoryCode}-${timestamp.toString().slice(-6)}`;
  },

  // Generate QR Code data
  generateQRCode(assetID) {
    return {
      assetID: assetID,
      qrCode: `QR-${assetID}`,
      qrURL: `https://wms.goli.com/assets/${assetID}`,
      generatedAt: new Date().toISOString()
    };
  },

  // Create new Asset
  async create(assetData) {
    try {
      const assetID = this.generateAssetID(assetData.category);
      const qrData = this.generateQRCode(assetID);
      
      const newAsset = {
        id: assetID,
        assetID: assetID,
        description: assetData.description,
        category: assetData.category,
        serialNumber: assetData.serialNumber || '',
        location: assetData.location || '',
        assignedTo: assetData.assignedTo || null,
        status: assetData.status || 'Available',
        purchaseDate: assetData.purchaseDate || new Date().toISOString(),
        purchasePrice: assetData.purchasePrice || 0,
        warranty: assetData.warranty || '',
        qrCode: qrData.qrCode,
        qrURL: qrData.qrURL,
        isTagged: true,
        createdBy: assetData.createdBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            action: 'Created',
            date: new Date().toISOString(),
            user: assetData.createdBy,
            status: assetData.status || 'Available'
          }
        ]
      };

      const success = await StorageService.set(`${ASSET_PREFIX}${assetID}`, newAsset);
      return success ? newAsset : null;
    } catch (error) {
      console.error('Error creating asset:', error);
      return null;
    }
  },

  // Get all Assets
  async getAll() {
    try {
      return await StorageService.getAllByPrefix(ASSET_PREFIX);
    } catch (error) {
      console.error('Error getting all assets:', error);
      return [];
    }
  },

  // Get single Asset by ID
  async getById(id) {
    try {
      return await StorageService.get(`${ASSET_PREFIX}${id}`);
    } catch (error) {
      console.error('Error getting asset:', error);
      return null;
    }
  },

  // Update Asset
  async update(id, updates) {
    try {
      const existingAsset = await this.getById(id);
      if (!existingAsset) return null;

      const updatedAsset = {
        ...existingAsset,
        ...updates,
        updatedAt: new Date().toISOString(),
        history: [
          ...existingAsset.history,
          {
            action: 'Updated',
            date: new Date().toISOString(),
            user: updates.updatedBy || 'System',
            status: updates.status || existingAsset.status
          }
        ]
      };

      const success = await StorageService.set(`${ASSET_PREFIX}${id}`, updatedAsset);
      return success ? updatedAsset : null;
    } catch (error) {
      console.error('Error updating asset:', error);
      return null;
    }
  },

  // Assign Asset
  async assignAsset(id, assignedTo, user) {
    try {
      const asset = await this.getById(id);
      if (!asset) return null;

      return await this.update(id, {
        assignedTo: assignedTo,
        status: 'In Use',
        updatedBy: user,
        history: [
          ...asset.history,
          {
            action: 'Assigned',
            date: new Date().toISOString(),
            user: user,
            assignedTo: assignedTo,
            status: 'In Use'
          }
        ]
      });
    } catch (error) {
      console.error('Error assigning asset:', error);
      return null;
    }
  },

  // Return Asset
  async returnAsset(id, user) {
    try {
      const asset = await this.getById(id);
      if (!asset) return null;

      return await this.update(id, {
        assignedTo: null,
        status: 'Available',
        updatedBy: user,
        history: [
          ...asset.history,
          {
            action: 'Returned',
            date: new Date().toISOString(),
            user: user,
            previousAssignee: asset.assignedTo,
            status: 'Available'
          }
        ]
      });
    } catch (error) {
      console.error('Error returning asset:', error);
      return null;
    }
  },

  // Update Asset Status
  async updateStatus(id, newStatus, user) {
    try {
      return await this.update(id, {
        status: newStatus,
        updatedBy: user
      });
    } catch (error) {
      console.error('Error updating asset status:', error);
      return null;
    }
  },

  // Delete Asset
  async delete(id) {
    try {
      return await StorageService.delete(`${ASSET_PREFIX}${id}`);
    } catch (error) {
      console.error('Error deleting asset:', error);
      return false;
    }
  },

  // Get assets by status
  async getByStatus(status) {
    try {
      const allAssets = await this.getAll();
      return allAssets.filter(asset => asset.status === status);
    } catch (error) {
      console.error('Error getting assets by status:', error);
      return [];
    }
  },

  // Get assets by category
  async getByCategory(category) {
    try {
      const allAssets = await this.getAll();
      return allAssets.filter(asset => asset.category === category);
    } catch (error) {
      console.error('Error getting assets by category:', error);
      return [];
    }
  },

  // Get assets assigned to user
  async getByAssignee(assignedTo) {
    try {
      const allAssets = await this.getAll();
      return allAssets.filter(asset => asset.assignedTo === assignedTo);
    } catch (error) {
      console.error('Error getting assets by assignee:', error);
      return [];
    }
  }
};

export default AssetService;