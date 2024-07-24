import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
// import CryptoJS from 'crypto-js';
import { users } from '../mockData';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const encryptedPassword = (values.password).toString();
    const validUser = users.find(user => user.username === values.username && user.password === encryptedPassword);
    if (validUser) {
      message.success('登录成功！');
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      navigate('/dashboard');
    } else {
      message.error('用户名或密码错误！');
    }
  };

  return (
    <Form form={form} onFinish={onFinish} style={{ maxWidth: 300, margin: 'auto' }}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/, message: '密码必须包含大小写字母及数字，且长度为8-16位' }
        ]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: '请输入邮箱地址！' }, { type: 'email', message: '邮箱格式不正确' }]}>
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">登录</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
