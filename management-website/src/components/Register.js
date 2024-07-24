import React from 'react';
import { Form, Input, Button, message } from 'antd';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { users } from '../mockData';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致！');
      return;
    }
    const encryptedPassword = CryptoJS.SHA256(values.password).toString();
    const newUser = {
      username: values.username,
      password: encryptedPassword,
      email: values.email
    };
    users.push(newUser);
    message.success('注册成功！');
    navigate('/login');
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱！' },
          { type: 'email', message: '邮箱格式不正确！' }
        ]}
      >
        <Input placeholder="邮箱" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码！' },
          { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, message: '密码必须包含大小写字母和数字，且长度为8-16位！' }
        ]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: '请确认密码！' }]}
      >
        <Input.Password placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
