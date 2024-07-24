import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, message } from 'antd';
import { roles, menus } from '../mockData'; // 导入角色和菜单数据

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessibleMenus, setAccessibleMenus] = useState([]);

  useEffect(() => {
    // 从本地存储中获取当前用户信息
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      message.error('请先登录');
      navigate('/');
      return;
    }
    setUser(currentUser);

    // 获取用户角色权限对应的菜单
    const userRoles = roles.filter(role => currentUser.roles.includes(role.id));
    const permissions = new Set(userRoles.flatMap(role => role.permissions));
    const getAccessibleMenus = (menus) => {
      return menus.filter(menu => permissions.has(menu.key) || (menu.children && getAccessibleMenus(menu.children).length > 0))
                  .map(menu => ({
                    ...menu,
                    children: menu.children ? getAccessibleMenus(menu.children) : []
                  }));
    };
    setAccessibleMenus(getAccessibleMenus(menus));
  }, [navigate]);

  const handleLogout = () => {
    // 清除登录状态
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {accessibleMenus.map(menu => (
            <Menu.Item key={menu.key}>{menu.name}</Menu.Item>
          ))}
          <Menu.Item key="logout" onClick={handleLogout}>登出</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" style={{ margin: '100px auto', maxWidth: '600px', textAlign: 'center' }}>
          <h1>欢迎进入信息管理系统</h1>
          <p>这是一个基本的Dashboard页面，可以根据需要添加更多功能。</p>
          {user && user.roles.includes('1') && ( // 如果用户是管理员
            <Button type="primary" onClick={() => message.info('编辑菜单功能开发中...')}>
              编辑菜单
            </Button>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
};

export default Dashboard;
