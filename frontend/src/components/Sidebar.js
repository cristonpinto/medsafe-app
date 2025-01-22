import React from 'react';
import { 
  Home, PlusCircle, Calendar, FileText, 
  PieChart, LogOut 
} from 'lucide-react';

function Sidebar({ isOpen }) {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: PlusCircle, label: "Medications", path: "/medications" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: PieChart, label: "Analytics", path: "/analytics" },
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="py-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <item.icon size={20} />
            {isOpen && <span className="ml-4">{item.label}</span>}
          </a>
        ))}
        
        {/* Logout at bottom */}
        <div className="absolute bottom-0 w-full border-t">
          <a
            href="/logout"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-4">Logout</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;