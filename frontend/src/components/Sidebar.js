import React, { useState, useEffect } from 'react';
import { 
  Home, PlusCircle, Calendar, FileText, 
  PieChart, LogOut, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar({ isOpen: propIsOpen, onClose }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(propIsOpen);

  useEffect(() => {
    setIsOpen(propIsOpen);
  }, [propIsOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: PlusCircle, label: "Medications", path: "/medications" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: PieChart, label: "Analytics", path: "/analytics" },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col py-4 overflow-y-auto">
      {isMobile && (
        <div className="px-4 mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>
      )}

      <nav className="flex-grow">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.path}
            onClick={() => isMobile && handleClose()}
            className={`
              flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
              ${!isOpen && !isMobile ? 'justify-center' : ''}
              rounded-lg mx-2
            `}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {(isOpen || isMobile) && (
              <span className="ml-4 font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </nav>
      
      <div className="border-t mt-4">
        <a
          href="/logout"
          onClick={() => isMobile && handleClose()}
          className={`
            flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors
            ${!isOpen && !isMobile ? 'justify-center' : ''}
            rounded-lg mx-2 mt-2
          `}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {(isOpen || isMobile) && (
            <span className="ml-4 font-medium">Logout</span>
          )}
        </a>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-black z-30"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed left-0 top-0 h-full bg-white shadow-lg w-72 z-40"
              >
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <aside
      className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {sidebarContent}
    </aside>
  );
}

export default Sidebar;