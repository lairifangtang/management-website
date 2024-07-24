import React from 'react';
import { Table, Button, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { user, roles } from '../mockData';

const { Option } = Select;

const UserManager = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                console.log(values);
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '注册日期', dataIndex: 'date', key: 'date' },
        { title: '角色', dataIndex: 'roles', key: 'roles', render: (roles) => roles.map(role => roles.find(r => r.id === role).roleName).join(', ') },
        {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: () => (
                <Popconfirm title="确定删除这个用户吗？">
                    <Button type="link">删除</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showModal}>
                新增用户
            </Button>
            <Modal title="新增用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="roles" label="角色">
                        <Select mode="multiple" placeholder="请选择角色">
                            {roles.map(role => (
                                <Option key={role.id} value={role.id}>{role.roleName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={user} rowKey="id" />
        </>
    );
};

export default UserManager;
