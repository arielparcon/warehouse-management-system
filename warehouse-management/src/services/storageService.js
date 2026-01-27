// Storage Service - Handles all persistent storage operations
const StorageService = {
  // Generic get function
  async get(key, shared = false) {
    try {
      const result = await window.storage.get(key, shared);
      if (result && result.value) {
        return JSON.parse(result.value);
      }
      return null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  // Generic set function
  async set(key, value, shared = false) {
    try {
      const result = await window.storage.set(key, JSON.stringify(value), shared);
      return result !== null;
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      return false;
    }
  },

  // Generic delete function
  async delete(key, shared = false) {
    try {
      const result = await window.storage.delete(key, shared);
      return result !== null;
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
      return false;
    }
  },

  // List all keys with a prefix
  async list(prefix, shared = false) {
    try {
      const result = await window.storage.list(prefix, shared);
      return result ? result.keys : [];
    } catch (error) {
      console.error(`Error listing keys with prefix ${prefix}:`, error);
      return [];
    }
  },

  // Get all items by prefix
  async getAllByPrefix(prefix, shared = false) {
    try {
      const keys = await this.list(prefix, shared);
      const items = [];
      
      for (const key of keys) {
        const item = await this.get(key, shared);
        if (item) {
          items.push(item);
        }
      }
      
      return items;
    } catch (error) {
      console.error(`Error getting all items with prefix ${prefix}:`, error);
      return [];
    }
  }
};

export default StorageService;