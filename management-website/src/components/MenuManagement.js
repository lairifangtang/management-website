import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, Modal, Form, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { menus } from '../mockData';

const MenuManagement = () => {
  const [dataSource, setDataSource] = useState(menus);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 获取当前用户信息
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      message.error('请先登录');
      return;
    }
    // 检查是否具有管理员角色
    setIsAdmin(currentUser.roles.includes('1')); // 角色ID为1代表管理员
  }, []);

  const handleDelete = (key) => {
    const deleteItem = (items, key) => {
      return items.filter(item => {
        if (item.key === key) {
          return false;
        }
        if (item.children) {
          item.children = deleteItem(item.children, key);
        }
        return true;
      });
    };
    setDataSource(deleteItem(dataSource, key));
  };
  const handleAddEdit = (values) => {
    if (editingItem) {
      // 编辑逻辑
      const newData = dataSource.map(item => {
        if (item.key === editingItem.key) {
          return { ...item, ...values };
        }
        return item;
      });
      setDataSource(newData);
    } else {
      // 新增逻辑
      const newKey = dataSource.length > 0 ? parseInt(dataSource[dataSource.length - 1].key) + 1 : 0;
      setDataSource([...dataSource, { ...values, key: newKey.toString() }]);
    }
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const showModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    form.setFieldsValue(item ? { name: item.name } : { name: '' }); // pre-fill form
  };

  const columns = [
    { title: '名称', dataIndex: 'name', key: 'name' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        isAdmin ? (
          <>
            <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)}>编辑</Button>
            <Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record.key)}>
              <Button type="link" icon={<DeleteOutlined />} >删除</Button>
            </Popconfirm>
          </>
        ) : null
      ),
    },
  ];

  return (
    <>
      {isAdmin && (
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal(null)} style={{ marginBottom: 16 }}>
          添加菜单
        </Button>
      )}
      <Table columns={columns} dataSource={dataSource} rowKey="key" />
      <Modal title={editingItem ? "编辑菜单" : "新增菜单"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleAddEdit}>
          <Form.Item name="name" label="菜单名称" rules={[{ required: true, message: '请输入菜单名称' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MenuManagement;
