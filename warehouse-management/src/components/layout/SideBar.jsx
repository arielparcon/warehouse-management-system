import React from 'react';
import { LayoutDashboard, FileText, ShoppingCart, Package, Scan, BarChart3, Settings, Users, Menu, X } from 'lucide-react';

const Sidebar = ({ activeModule, setActiveModule, sidebarOpen, setSidebarOpen }) => {
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'pr', name: 'Purchase Requests', icon: FileText },
    { id: 'po', name: 'Purchase Orders', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory', icon: Package },
    { id: 'assets', name: 'Asset Tracking', icon: Scan },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-4 border-b border-blue-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">Warehouse Management System</h1>
              <p className="text-xs text-blue-200">Global Officium Limited Inc.</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <li key={module.id}>
                <button
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeModule === module.id
                      ? 'bg-blue-700 text-white shadow-lg'
                      : 'hover:bg-blue-800 text-blue-100'
                  }`}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span className="text-sm font-medium">{module.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {sidebarOpen && (
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">AP</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Ariel Parcon</p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;