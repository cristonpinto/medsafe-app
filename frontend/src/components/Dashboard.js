import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Main Content */}
      <main className={`pt-16 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          
          {/* Add your dashboard content here */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900">Medications</h2>
              <p className="mt-2 text-gray-600">Track your daily medications and schedules</p>
            </div>
            
            {/* Add more cards/content as needed */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;