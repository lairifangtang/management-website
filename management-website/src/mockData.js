export const users = [
  {
      username: 'user1',
      password: 'Password123', // 这应该是加密过的密码，这里为了简化使用明文
      email: 'user1@example.com',
      roles: ['1'] // 添加角色字段，使用角色ID
  },
  {
      username: 'user2',
      password: 'Password123',
      email: 'user2@example.com',
      roles: ['2']
  }
];

export const menus = [
  {
      key: '1',
      name: '系统管理',
      children: [
          {
              key: '1-1',
              name: '用户管理',
          },
          {
              key: '1-2',
              name: '角色管理',
          },
      ],
  },
  {
      key: '2',
      name: '内容管理',
      children: [
          {
              key: '2-1',
              name: '新闻管理',
          },
          {
              key: '2-2',
              name: '评论管理',
          },
      ],
  },
];

export const user = [
  {
      id: '1',
      username: 'user1',
      email: 'user1@example.com',
      date: '2020-01-01',
      roles: ['1']
  },
  {
      id: '2',
      username: 'user2',
      email: 'user2@example.com',
      date: '2020-02-01',
      roles: ['2']
  },
  {
      id: '3',
      username: 'user3',
      email: 'user3@example.com',
      date: '2020-03-01',
      roles: []
  }
];

export const roles = [
  {
      id: '1',
      roleName: '管理员',
      permissions: ['1', '1-1', '1-2', '2', '2-1', '2-2']
  },
  {
      id: '2',
      roleName: '编辑',
      permissions: ['2', '2-1']
  }
];

export default users;
