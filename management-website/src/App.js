import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { menus, users, roles } from './mockData'; // 确保在 src 目录中
import Login from './components/Login'; // 确认路径正确
import Dashboard from './components/Dashboard'; // 确认路径正确
import { flattenMenus } from './utils'; // 导入 flattenMenus 函数

const App = () => {
  const [currentUser, setCurrentUser] = React.useState(null);

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const getAccessibleMenus = (user) => {
    if (!user || !user.roles) return [];
    const userRoles = roles.filter(role => user.roles.includes(role.id));
    const permissions = new Set(userRoles.flatMap(role => role.permissions));
    return flattenMenus(menus).filter(menu => permissions.has(menu.key));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/dashboard" element={currentUser ? <Dashboard menus={getAccessibleMenus(currentUser)} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
