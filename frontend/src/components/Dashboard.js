import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Loader from './Loader';
import './Dashboard.scss';
import { 
  Calendar, 
  Pill, 
  AlertCircle, 
  Bell, 
  FileText, 
  CheckSquare, 
  Heart, 
  Shield,
  RefreshCw,
  Database
} from 'lucide-react';
import { setUser } from '../features/userSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const user = useSelector(state => state.user);
  const [localFirstName, setLocalFirstName] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setLocalFirstName(storedName);
      dispatch(setUser({ firstName: storedName }));
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user.firstName) {
      localStorage.setItem('userName', user.firstName);
      setLocalFirstName(user.firstName);
    }
  }, [user.firstName]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  const dashboardCards = [
    { 
      icon: <Pill className="h-6 w-6" />, 
      title: "Medication Schedule", 
      subtitle: "3 Upcoming Doses",
      color: "text-blue-500"
    },
    { 
      icon: <AlertCircle className="h-6 w-6" />, 
      title: "Drug Interactions", 
      subtitle: "0 Critical Alerts",
      color: "text-green-500"
    },
    { 
      icon: <Bell className="h-6 w-6" />, 
      title: "Medication Reminders", 
      subtitle: "2 Active Notifications",
      color: "text-purple-500"
    },
    { 
      icon: <Shield className="h-6 w-6" />, 
      title: "HIPAA Compliance", 
      subtitle: "Security Status: Active",
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} />
        
        <main className={`flex-grow p-4 sm:p-6 lg:p-8 transition-all duration-300
          ${isMobile 
            ? isSidebarOpen ? 'ml-0' : 'ml-0' 
            : isSidebarOpen ? 'ml-64' : 'ml-20'
          }`}>
          <div className="max-w-7xl mx-auto">
            <div className="main-header mb-6">
              <div className="main-header__intro-wrapper">
                <div className="main-header__welcome">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Welcome, <strong>{user.firstName || localFirstName || 'User'}</strong>
                  </h1>
                  <p className="text-gray-600">Your MedSafe Dashboard</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dashboardCards.map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow p-4 flex items-center hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`mr-4 ${card.color}`}>{card.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-4">
                  <RefreshCw className="h-5 w-5 mr-2 text-blue-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Upcoming Refills</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Metformin</span>
                    <span className="text-sm text-gray-600">Due in 5 days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lisinopril</span>
                    <span className="text-sm text-gray-600">Due in 7 days</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-4">
                  <Database className="h-5 w-5 mr-2 text-green-500" />
                  <h2 className="text-lg font-semibold text-gray-800">Medical Records</h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Annual Check-up</span>
                    <span className="text-sm text-gray-600">Updated 3 days ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Prescription History</span>
                    <span className="text-sm text-gray-600">Last reviewed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="bg-gray-800 text-white py-4 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2024 MedSafe</p>
          <p className="mt-2 sm:mt-0">
            Secure Health Management <Heart className="inline h-4 w-4 text-red-500" />
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;