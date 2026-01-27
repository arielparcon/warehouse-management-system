import StorageService from './storageService';

const PO_PREFIX = 'po:';

const PurchaseOrderService = {
  // Generate unique PO number
  generatePONumber() {
    const year = new Date().getFullYear();
    const timestamp = Date.now();
    return `PO-${year}-${timestamp.toString().slice(-6)}`;
  },

  // Create new Purchase Order
  async create(poData) {
    try {
      const poNumber = this.generatePONumber();
      const newPO = {
        id: poNumber,
        poNumber: poNumber,
        prReference: poData.prReference,
        supplier: poData.supplier,
        supplierContact: poData.supplierContact || '',
        date: new Date().toISOString(),
        deliveryDate: poData.deliveryDate || null,
        items: poData.items || [],
        totalAmount: poData.totalAmount || 0,
        status: 'Pending',
        paymentTerms: poData.paymentTerms || '',
        notes: poData.notes || '',
        createdBy: poData.createdBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            action: 'Created',
            date: new Date().toISOString(),
            user: poData.createdBy,
            status: 'Pending'
          }
        ]
      };

      const success = await StorageService.set(`${PO_PREFIX}${poNumber}`, newPO);
      return success ? newPO : null;
    } catch (error) {
      console.error('Error creating PO:', error);
      return null;
    }
  },

  // Get all Purchase Orders
  async getAll() {
    try {
      return await StorageService.getAllByPrefix(PO_PREFIX);
    } catch (error) {
      console.error('Error getting all POs:', error);
      return [];
    }
  },

  // Get single Purchase Order by ID
  async getById(id) {
    try {
      return await StorageService.get(`${PO_PREFIX}${id}`);
    } catch (error) {
      console.error('Error getting PO:', error);
      return null;
    }
  },

  // Update Purchase Order
  async update(id, updates) {
    try {
      const existingPO = await this.getById(id);
      if (!existingPO) return null;

      const updatedPO = {
        ...existingPO,
        ...updates,
        updatedAt: new Date().toISOString(),
        history: [
          ...existingPO.history,
          {
            action: 'Updated',
            date: new Date().toISOString(),
            user: updates.updatedBy || 'System',
            status: updates.status || existingPO.status
          }
        ]
      };

      const success = await StorageService.set(`${PO_PREFIX}${id}`, updatedPO);
      return success ? updatedPO : null;
    } catch (error) {
      console.error('Error updating PO:', error);
      return null;
    }
  },

  // Update PO Status
  async updateStatus(id, newStatus, user) {
    try {
      return await this.update(id, {
        status: newStatus,
        updatedBy: user
      });
    } catch (error) {
      console.error('Error updating PO status:', error);
      return null;
    }
  },

  // Delete Purchase Order
  async delete(id) {
    try {
      return await StorageService.delete(`${PO_PREFIX}${id}`);
    } catch (error) {
      console.error('Error deleting PO:', error);
      return false;
    }
  },

  // Get POs by status
  async getByStatus(status) {
    try {
      const allPOs = await this.getAll();
      return allPOs.filter(po => po.status === status);
    } catch (error) {
      console.error('Error getting POs by status:', error);
      return [];
    }
  },

  // Get POs by supplier
  async getBySupplier(supplier) {
    try {
      const allPOs = await this.getAll();
      return allPOs.filter(po => po.supplier.toLowerCase().includes(supplier.toLowerCase()));
    } catch (error) {
      console.error('Error getting POs by supplier:', error);
      return [];
    }
  },

  // Get POs by PR Reference
  async getByPRReference(prReference) {
    try {
      const allPOs = await this.getAll();
      return allPOs.filter(po => po.prReference === prReference);
    } catch (error) {
      console.error('Error getting POs by PR reference:', error);
      return [];
    }
  }
};

export default PurchaseOrderService;