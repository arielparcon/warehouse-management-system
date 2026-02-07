import supabase from '../config/supabase';

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
        po_number: poNumber,
        pr_reference: poData.prReference || null,
        supplier: poData.supplier,
        supplier_contact: poData.supplierContact || '',
        delivery_date: poData.deliveryDate || null,
        items: poData.items || [],
        total_amount: poData.totalAmount || 0,
        status: 'Pending',
        payment_terms: poData.paymentTerms || '',
        notes: poData.notes || '',
        created_by: poData.createdBy,
        history: [
          {
            action: 'Created',
            date: new Date().toISOString(),
            user: poData.createdBy,
            status: 'Pending'
          }
        ]
      };

      const { data, error } = await supabase
        .from('purchase_orders')
        .insert([newPO])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating PO:', error);
      return null;
    }
  },

  // Get all Purchase Orders
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting all POs:', error);
      return [];
    }
  },

  // Get single Purchase Order by ID
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
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

      const updatedHistory = [
        ...existingPO.history,
        {
          action: 'Updated',
          date: new Date().toISOString(),
          user: updates.updatedBy || 'System',
          status: updates.status || existingPO.status
        }
      ];

      const { data, error } = await supabase
        .from('purchase_orders')
        .update({
          ...updates,
          history: updatedHistory
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from('purchase_orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting PO:', error);
      return false;
    }
  },

  // Get POs by status
  async getByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting POs by status:', error);
      return [];
    }
  },

  // Get POs by supplier
  async getBySupplier(supplier) {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .ilike('supplier', `%${supplier}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting POs by supplier:', error);
      return [];
    }
  },

  // Get POs by PR Reference
  async getByPRReference(prReference) {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('pr_reference', prReference)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting POs by PR reference:', error);
      return [];
    }
  }
};

export default PurchaseOrderService;