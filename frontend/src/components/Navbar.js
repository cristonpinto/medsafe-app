import React, { useState } from 'react';
import { 
  Settings, Bell, Search, ChevronDown, Menu, X
} from 'lucide-react';

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: "Medication reminder: Take Aspirin", time: "5 min ago" },
    { id: 2, text: "New interaction warning detected", time: "1 hour ago" },
    { id: 3, text: "Appointment reminder tomorrow", time: "2 hours ago" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-full mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
            <div className="ml-4 flex items-center">
              <span className="text-xl font-bold text-blue-600">MediSafe</span>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search medications, interactions..."
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Right side - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border">
                  <div className="px-4 py-2 border-b">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <div className="border-t my-1"></div>
                  <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mb-3">
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search medications, interactions..."
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>

              {/* Mobile Notifications */}
              <div className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
                <Bell size={20} className="mr-3" />
                <span>Notifications</span>
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
              </div>

              {/* Mobile Settings */}
              <a href="/settings" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
                <Settings size={20} className="mr-3" />
                <span>Settings</span>
              </a>

              {/* Mobile Profile */}
              <div className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span>John Doe</span>
              </div>

              {/* Mobile Profile Links */}
              <a href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                View Profile
              </a>
              <a href="/login" className="block px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;  