import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MenuManagement from './components/MenuManagement';
import UserManager from './components/UserManager';
import RoleManager from './components/RoleManager';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu-management" element={<MenuManagement />} />
      <Route path="/user-manager" element={<UserManager />} />
      <Route path="/role-manager" element={<RoleManager />} />

    </Routes>
  </Router>
);



export default AppRouter;
