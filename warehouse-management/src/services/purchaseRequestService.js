import StorageService from './storageService';

const PR_PREFIX = 'pr:';

const PurchaseRequestService = {
  // Generate unique PR number
  generatePRNumber() {
    const year = new Date().getFullYear();
    const timestamp = Date.now();
    return `PR-${year}-${timestamp.toString().slice(-6)}`;
  },

  // Create new Purchase Request
  async create(prData) {
    try {
      const prNumber = this.generatePRNumber();
      const newPR = {
        id: prNumber,
        prNumber: prNumber,
        date: new Date().toISOString(),
        department: prData.department,
        requestedBy: prData.requestedBy,
        items: prData.items || [],
        status: 'Submitted',
        notes: prData.notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [
          {
            action: 'Created',
            date: new Date().toISOString(),
            user: prData.requestedBy,
            status: 'Submitted'
          }
        ]
      };

      const success = await StorageService.set(`${PR_PREFIX}${prNumber}`, newPR);
      return success ? newPR : null;
    } catch (error) {
      console.error('Error creating PR:', error);
      return null;
    }
  },

  // Get all Purchase Requests
  async getAll() {
    try {
      return await StorageService.getAllByPrefix(PR_PREFIX);
    } catch (error) {
      console.error('Error getting all PRs:', error);
      return [];
    }
  },

  // Get single Purchase Request by ID
  async getById(id) {
    try {
      return await StorageService.get(`${PR_PREFIX}${id}`);
    } catch (error) {
      console.error('Error getting PR:', error);
      return null;
    }
  },

  // Update Purchase Request
  async update(id, updates) {
    try {
      const existingPR = await this.getById(id);
      if (!existingPR) return null;

      const updatedPR = {
        ...existingPR,
        ...updates,
        updatedAt: new Date().toISOString(),
        history: [
          ...existingPR.history,
          {
            action: 'Updated',
            date: new Date().toISOString(),
            user: updates.updatedBy || 'System',
            status: updates.status || existingPR.status,
            notes: updates.notes || ''
          }
        ]
      };

      const success = await StorageService.set(`${PR_PREFIX}${id}`, updatedPR);
      return success ? updatedPR : null;
    } catch (error) {
      console.error('Error updating PR:', error);
      return null;
    }
  },

  // Update PR Status
  async updateStatus(id, newStatus, user) {
    try {
      return await this.update(id, {
        status: newStatus,
        updatedBy: user
      });
    } catch (error) {
      console.error('Error updating PR status:', error);
      return null;
    }
  },

  // Delete Purchase Request
  async delete(id) {
    try {
      return await StorageService.delete(`${PR_PREFIX}${id}`);
    } catch (error) {
      console.error('Error deleting PR:', error);
      return false;
    }
  },

  // Get PRs by status
  async getByStatus(status) {
    try {
      const allPRs = await this.getAll();
      return allPRs.filter(pr => pr.status === status);
    } catch (error) {
      console.error('Error getting PRs by status:', error);
      return [];
    }
  },

  // Get PRs by department
  async getByDepartment(department) {
    try {
      const allPRs = await this.getAll();
      return allPRs.filter(pr => pr.department === department);
    } catch (error) {
      console.error('Error getting PRs by department:', error);
      return [];
    }
  }
};

export default PurchaseRequestService;