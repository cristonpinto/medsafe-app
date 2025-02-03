import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store'; // Make sure you have this file
import './index.css'; 
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Medications from './components/Medications';
import InteractionChecker from './components/InteractionChecker';
import Settings from './components/Settings';
import Help from './components/Help';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/interactions" element={<InteractionChecker />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;