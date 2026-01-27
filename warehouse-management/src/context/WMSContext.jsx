import React, { createContext, useContext, useState, useEffect } from 'react';
import PurchaseRequestService from '../services/purchaseRequestService';
import PurchaseOrderService from '../services/purchaseOrderService';
import InventoryService from '../services/inventoryService';
import AssetService from '../services/assetService';

const WMSContext = createContext();

export const useWMS = () => {
  const context = useContext(WMSContext);
  if (!context) {
    throw new Error('useWMS must be used within WMSProvider');
  }
  return context;
};

export const WMSProvider = ({ children }) => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser] = useState({
    name: 'Ariel Parcon',
    email: 'ariel@goli.com',
    role: 'Administrator'
  });

  // Load all data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [prs, pos, inv, ast] = await Promise.all([
        PurchaseRequestService.getAll(),
        PurchaseOrderService.getAll(),
        InventoryService.getAll(),
        AssetService.getAll()
      ]);
      
      setPurchaseRequests(prs);
      setPurchaseOrders(pos);
      setInventory(inv);
      setAssets(ast);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Purchase Request Functions
  const createPR = async (prData) => {
    const newPR = await PurchaseRequestService.create({
      ...prData,
      requestedBy: currentUser.name
    });
    if (newPR) {
      setPurchaseRequests(prev => [...prev, newPR]);
    }
    return newPR;
  };

  const updatePR = async (id, updates) => {
    const updatedPR = await PurchaseRequestService.update(id, {
      ...updates,
      updatedBy: currentUser.name
    });
    if (updatedPR) {
      setPurchaseRequests(prev => 
        prev.map(pr => pr.id === id ? updatedPR : pr)
      );
    }
    return updatedPR;
  };

  const deletePR = async (id) => {
    const success = await PurchaseRequestService.delete(id);
    if (success) {
      setPurchaseRequests(prev => prev.filter(pr => pr.id !== id));
    }
    return success;
  };

  // Purchase Order Functions
  const createPO = async (poData) => {
    const newPO = await PurchaseOrderService.create({
      ...poData,
      createdBy: currentUser.name
    });
    if (newPO) {
      setPurchaseOrders(prev => [...prev, newPO]);
    }
    return newPO;
  };

  const updatePO = async (id, updates) => {
    const updatedPO = await PurchaseOrderService.update(id, {
      ...updates,
      updatedBy: currentUser.name
    });
    if (updatedPO) {
      setPurchaseOrders(prev =>
        prev.map(po => po.id === id ? updatedPO : po)
      );
    }
    return updatedPO;
  };

  const deletePO = async (id) => {
    const success = await PurchaseOrderService.delete(id);
    if (success) {
      setPurchaseOrders(prev => prev.filter(po => po.id !== id));
    }
    return success;
  };

  // Inventory Functions
  const createInventoryItem = async (itemData) => {
    const newItem = await InventoryService.create({
      ...itemData,
      createdBy: currentUser.name
    });
    if (newItem) {
      setInventory(prev => [...prev, newItem]);
    }
    return newItem;
  };

  const updateInventoryItem = async (id, updates) => {
    const updatedItem = await InventoryService.update(id, {
      ...updates,
      updatedBy: currentUser.name
    });
    if (updatedItem) {
      setInventory(prev =>
        prev.map(item => item.id === id ? updatedItem : item)
      );
    }
    return updatedItem;
  };

  const adjustInventoryQuantity = async (id, adjustment, type) => {
    const updatedItem = await InventoryService.adjustQuantity(id, adjustment, type, currentUser.name);
    if (updatedItem) {
      setInventory(prev =>
        prev.map(item => item.id === id ? updatedItem : item)
      );
    }
    return updatedItem;
  };

  const deleteInventoryItem = async (id) => {
    const success = await InventoryService.delete(id);
    if (success) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
    return success;
  };

  // Asset Functions
  const createAsset = async (assetData) => {
    const newAsset = await AssetService.create({
      ...assetData,
      createdBy: currentUser.name
    });
    if (newAsset) {
      setAssets(prev => [...prev, newAsset]);
    }
    return newAsset;
  };

  const updateAsset = async (id, updates) => {
    const updatedAsset = await AssetService.update(id, {
      ...updates,
      updatedBy: currentUser.name
    });
    if (updatedAsset) {
      setAssets(prev =>
        prev.map(asset => asset.id === id ? updatedAsset : asset)
      );
    }
    return updatedAsset;
  };

  const assignAsset = async (id, assignedTo) => {
    const updatedAsset = await AssetService.assignAsset(id, assignedTo, currentUser.name);
    if (updatedAsset) {
      setAssets(prev =>
        prev.map(asset => asset.id === id ? updatedAsset : asset)
      );
    }
    return updatedAsset;
  };

  const returnAsset = async (id) => {
    const updatedAsset = await AssetService.returnAsset(id, currentUser.name);
    if (updatedAsset) {
      setAssets(prev =>
        prev.map(asset => asset.id === id ? updatedAsset : asset)
      );
    }
    return updatedAsset;
  };

  const deleteAsset = async (id) => {
    const success = await AssetService.delete(id);
    if (success) {
      setAssets(prev => prev.filter(asset => asset.id !== id));
    }
    return success;
  };

  // Dashboard Stats
  const getStats = () => {
    return {
      totalInventoryItems: inventory.length,
      pendingPRs: purchaseRequests.filter(pr => pr.status === 'Submitted' || pr.status === 'For Canvass').length,
      activePOs: purchaseOrders.filter(po => po.status === 'Pending' || po.status === 'Approved').length,
      assetsTagged: assets.filter(asset => asset.isTagged).length,
      lowStockItems: inventory.filter(item => item.quantity <= item.minStockLevel && item.quantity > 0).length,
      outOfStockItems: inventory.filter(item => item.quantity === 0).length
    };
  };

  const value = {
    // State
    purchaseRequests,
    purchaseOrders,
    inventory,
    assets,
    loading,
    currentUser,
    
    // Functions
    createPR,
    updatePR,
    deletePR,
    createPO,
    updatePO,
    deletePO,
    createInventoryItem,
    updateInventoryItem,
    adjustInventoryQuantity,
    deleteInventoryItem,
    createAsset,
    updateAsset,
    assignAsset,
    returnAsset,
    deleteAsset,
    getStats,
    refreshData: loadAllData
  };

  return (
    <WMSContext.Provider value={value}>
      {children}
    </WMSContext.Provider>
  );
};

export default WMSContext;