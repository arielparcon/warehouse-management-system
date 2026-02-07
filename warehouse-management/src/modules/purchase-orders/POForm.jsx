import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';
import { useWMS } from '../../context/WMSContext';

const POForm = ({ onClose, onSuccess }) => {
  const { createPO, purchaseRequests } = useWMS();
  const [formData, setFormData] = useState({
    prReference: '',
    supplier: '',
    supplierContact: '',
    deliveryDate: '',
    paymentTerms: '',
    notes: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }]
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    
    // Calculate total for this item
    if (field === 'quantity' || field === 'unitPrice') {
      const qty = field === 'quantity' ? value : newItems[index].quantity;
      const price = field === 'unitPrice' ? value : newItems[index].unitPrice;
      newItems[index].total = qty * price;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalAmount = calculateTotal();
      const result = await createPO({ ...formData, totalAmount });
      
      if (result) {
        onSuccess && onSuccess(result);
        onClose();
      } else {
        alert('Failed to create Purchase Order');
      }
    } catch (error) {
      console.error('Error creating PO:', error);
      alert('Error creating Purchase Order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* PR Reference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PR Reference
          </label>
          <select
            name="prReference"
            value={formData.prReference}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None (Direct PO)</option>
            {purchaseRequests.filter(pr => pr.status === 'Approved').map(pr => (
              <option key={pr.id} value={pr.prNumber}>
                {pr.prNumber} - {pr.department}
              </option>
            ))}
          </select>
        </div>

        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplier <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Supplier Name"
          />
        </div>

        {/* Supplier Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Supplier Contact
          </label>
          <input
            type="text"
            name="supplierContact"
            value={formData.supplierContact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone or Email"
          />
        </div>

        {/* Delivery Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Payment Terms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Terms
        </label>
        <input
          type="text"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Net 30, COD, 50% upfront"
        />
      </div>

      {/* Items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Items <span className="text-red-500">*</span>
          </label>
          <Button type="button" variant="outline" size="sm" icon={Plus} onClick={addItem}>
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-start p-3 border border-gray-200 rounded-lg">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Item Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={item.total.toFixed(2)}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Total Amount */}
        <div className="mt-3 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-bold text-gray-800">₱{calculateTotal().toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Additional notes or special instructions..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="success" disabled={loading}>
          {loading ? 'Creating...' : 'Create Purchase Order'}
        </Button>
      </div>
    </form>
  );
};

export default POForm;