import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Checkbox, Popconfirm } from 'antd';
import { roles, menus } from '../mockData';

const flattenMenus = menus => {
  let flat = [];
  menus.forEach(item => {
    flat.push({ key: item.key, name: item.name });
    if (item.children) {
      flat = flat.concat(flattenMenus(item.children));
    }
  });
  return flat;
};

const RoleManager = () => {
  const [dataSource, setDataSource] = useState(roles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = (key) => {
    const newData = dataSource.filter(item => item.id !== key);
    setDataSource(newData);
  };

  const handleAddEdit = (values) => {
    if (editingItem) {
      const newData = dataSource.map(item => {
        if (item.id === editingItem.id) {
          return { ...item, ...values };
        }
        return item;
      });
      setDataSource(newData);
    } else {
      const newKey = dataSource.length > 0 ? parseInt(dataSource[dataSource.length - 1].id) + 1 : 1;
      setDataSource([...dataSource, { ...values, id: newKey.toString() }]);
    }
    setIsModalVisible(false);
    setEditingItem(null);
  };

  const showModal = (item) => {
    setEditingItem(item);
    setIsModalVisible(true);
    form.setFieldsValue(item ? { roleName: item.roleName, permissions: item.permissions } : { roleName: '', permissions: [] });
  };
  const columns = [
    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>编辑</Button>
          <Popconfirm title="确定删除这个角色吗？" onConfirm={() => handleDelete(record.id)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal(null)} style={{ marginBottom: 16 }}>新增角色</Button>
      <Table columns={columns} dataSource={dataSource} rowKey="id" />
      <Modal title={editingItem ? "编辑角色" : "新增角色"} visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={() => form.submit()}>
        <Form form={form} onFinish={handleAddEdit}>
          <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="permissions" label="菜单权限">
            <Checkbox.Group>
              {flattenMenus(menus).map(menu => (
                <Checkbox key={menu.key} value={menu.key}>{menu.name}</Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RoleManager;