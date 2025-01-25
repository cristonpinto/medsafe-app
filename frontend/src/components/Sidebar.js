import React, { useState, useEffect } from 'react';
import { 
  Home, PlusCircle, Calendar, FileText, 
  PieChart, LogOut 
} from 'lucide-react';

function Sidebar({ isOpen }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: PlusCircle, label: "Medications", path: "/medications" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: PieChart, label: "Analytics", path: "/analytics" },
  ];

  return (
    <aside className={`
      fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-30
      ${isMobile 
        ? isOpen ? 'w-full' : 'w-0 -translate-x-full' 
        : isOpen ? 'w-64' : 'w-20'
      }
    `}>
      <div className="h-full flex flex-col py-4 overflow-y-auto">
        <nav className="flex-grow">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`
                flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
                ${!isOpen && !isMobile ? 'justify-center' : ''}
              `}
            >
              <item.icon size={20} />
              {(isOpen || isMobile) && <span className="ml-4">{item.label}</span>}
            </a>
          ))}
        </nav>
        
        {/* Logout at bottom */}
        <div className="border-t">
          <a
            href="/logout"
            className={`
              flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
              ${!isOpen && !isMobile ? 'justify-center' : ''}
            `}
          >
            <LogOut size={20} />
            {(isOpen || isMobile) && <span className="ml-4">Logout</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;