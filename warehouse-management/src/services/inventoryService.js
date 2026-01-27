import StorageService from './storageService';

const INVENTORY_PREFIX = 'inventory:';

const InventoryService = {
  // Generate unique item code
  generateItemCode(category) {
    const timestamp = Date.now();
    const categoryCode = category.substring(0, 3).toUpperCase();
    return `${categoryCode}-${timestamp.toString().slice(-6)}`;
  },

  // Create new Inventory Item
  async create(itemData) {
    try {
      const itemCode = this.generateItemCode(itemData.category);
      const newItem = {
        id: itemCode,
        itemCode: itemCode,
        description: itemData.description,
        category: itemData.category,
        quantity: itemData.quantity || 0,
        unit: itemData.unit,
        location: itemData.location || '',
        minStockLevel: itemData.minStockLevel || 0,
        maxStockLevel: itemData.maxStockLevel || 0,
        unitPrice: itemData.unitPrice || 0,
        supplier: itemData.supplier || '',
        status: itemData.quantity > 0 ? 'In Stock' : 'Out of Stock',
        createdBy: itemData.createdBy,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            action: 'Created',
            date: new Date().toISOString(),
            user: itemData.createdBy,
            quantity: itemData.quantity
          }
        ]
      };

      const success = await StorageService.set(`${INVENTORY_PREFIX}${itemCode}`, newItem);
      return success ? newItem : null;
    } catch (error) {
      console.error('Error creating inventory item:', error);
      return null;
    }
  },

  // Get all Inventory Items
  async getAll() {
    try {
      return await StorageService.getAllByPrefix(INVENTORY_PREFIX);
    } catch (error) {
      console.error('Error getting all inventory items:', error);
      return [];
    }
  },

  // Get single Inventory Item by ID
  async getById(id) {
    try {
      return await StorageService.get(`${INVENTORY_PREFIX}${id}`);
    } catch (error) {
      console.error('Error getting inventory item:', error);
      return null;
    }
  },

  // Update Inventory Item
  async update(id, updates) {
    try {
      const existingItem = await this.getById(id);
      if (!existingItem) return null;

      const updatedItem = {
        ...existingItem,
        ...updates,
        updatedAt: new Date().toISOString(),
        history: [
          ...existingItem.history,
          {
            action: 'Updated',
            date: new Date().toISOString(),
            user: updates.updatedBy || 'System',
            quantity: updates.quantity || existingItem.quantity
          }
        ]
      };

      const success = await StorageService.set(`${INVENTORY_PREFIX}${id}`, updatedItem);
      return success ? updatedItem : null;
    } catch (error) {
      console.error('Error updating inventory item:', error);
      return null;
    }
  },

  // Adjust Quantity (Receive/Issue/Transfer)
  async adjustQuantity(id, adjustment, type, user) {
    try {
      const item = await this.getById(id);
      if (!item) return null;

      const newQuantity = item.quantity + adjustment;
      
      let status = 'In Stock';
      if (newQuantity === 0) status = 'Out of Stock';
      else if (newQuantity <= item.minStockLevel) status = 'Low Stock';

      return await this.update(id, {
        quantity: newQuantity,
        status: status,
        updatedBy: user,
        history: [
          ...item.history,
          {
            action: type,
            date: new Date().toISOString(),
            user: user,
            adjustment: adjustment,
            previousQuantity: item.quantity,
            newQuantity: newQuantity
          }
        ]
      });
    } catch (error) {
      console.error('Error adjusting quantity:', error);
      return null;
    }
  },

  // Delete Inventory Item
  async delete(id) {
    try {
      return await StorageService.delete(`${INVENTORY_PREFIX}${id}`);
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      return false;
    }
  },

  // Get items by category
  async getByCategory(category) {
    try {
      const allItems = await this.getAll();
      return allItems.filter(item => item.category === category);
    } catch (error) {
      console.error('Error getting items by category:', error);
      return [];
    }
  },

  // Get low stock items
  async getLowStockItems() {
    try {
      const allItems = await this.getAll();
      return allItems.filter(item => item.quantity <= item.minStockLevel && item.quantity > 0);
    } catch (error) {
      console.error('Error getting low stock items:', error);
      return [];
    }
  },

  // Get out of stock items
  async getOutOfStockItems() {
    try {
      const allItems = await this.getAll();
      return allItems.filter(item => item.quantity === 0);
    } catch (error) {
      console.error('Error getting out of stock items:', error);
      return [];
    }
  }
};

export default InventoryService;