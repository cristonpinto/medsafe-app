import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Medications from './components/Medications';
import InteractionChecker from './components/InteractionChecker';
import Settings from './components/Settings';
import Help from './components/Help';
import Login from './components/Login'; // Import Login component
import Signup from './components/Signup'; // Import Signup component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/interactions" element={<InteractionChecker />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} /> // Add Login route
          <Route path="/signup" element={<Signup />} /> // Add Signup route
        </Routes>
      </div>
    </Router>
  );
}

export default App;
