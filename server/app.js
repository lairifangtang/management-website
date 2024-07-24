const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// 模拟数据
let users = [];
let menus = [{ id: '1', name: '主菜单', children: [{ id: '2', name: '子菜单1' }] }];
let roles = [];

// 秘钥，用于生成和验证JWT
const SECRET_KEY = 'your_secret_key';

// 注册
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword, email, roles: [] };
  users.push(newUser);
  res.json({ success: true, message: '注册成功' });
});

// 登录
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, message: '登录成功', token });
  } else {
    res.status(401).json({ success: false, message: '登录失败' });
  }
});

// 验证JWT中间件
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// 获取菜单列表
app.get('/menus', authenticateJWT, (req, res) => {
  res.json(menus);
});

// 添加菜单
app.post('/menus', authenticateJWT, (req, res) => {
  const { name, parentId } = req.body;
  const newId = uuidv4();
  const newMenu = { id: newId, name, children: [] };
  if (parentId) {
    const parent = menus.find(menu => menu.id === parentId);
    if (parent) {
      parent.children.push(newMenu);
    } else {
      res.status(400).json({ success: false, message: '父菜单不存在' });
      return;
    }
  } else {
    menus.push(newMenu);
  }
  res.json({ success: true, message: '菜单添加成功', menu: newMenu });
});

// 修改菜单
app.put('/menus/:id', authenticateJWT, (req, res) => {
  const { name } = req.body;
  const menu = menus.find(menu => menu.id === req.params.id);
  if (menu) {
    menu.name = name;
    res.json({ success: true, message: '菜单更新成功', menu });
  } else {
    res.status(404).json({ success: false, message: '菜单不存在' });
  }
});

// 删除菜单
app.delete('/menus/:id', authenticateJWT, (req, res) => {
  const deleteItem = (items, id) => {
    return items.filter(item => {
      if (item.id === id) {
        return false;
      }
      if (item.children) {
        item.children = deleteItem(item.children, id);
      }
      return true;
    });
  };
  const initialLength = menus.length;
  menus = deleteItem(menus, req.params.id);
  if (menus.length < initialLength) {
    res.json({ success: true, message: '菜单删除成功' });
  } else {
    res.status(404).json({ success: false, message: '菜单不存在' });
  }
});

// 获取用户列表
app.get('/users', authenticateJWT, (req, res) => {
  res.json(users);
});

// 添加用户
app.post('/users', authenticateJWT, async (req, res) => {
  const { username, password, email, roles } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword, email, roles };
  users.push(newUser);
  res.json({ success: true, message: '用户添加成功', user: newUser });
});

// 修改用户
app.put('/users/:id', authenticateJWT, (req, res) => {
  const { username, email, roles } = req.body;
  const user = users.find(user => user.id === req.params.id);
  if (user) {
    user.username = username;
    user.email = email;
    user.roles = roles;
    res.json({ success: true, message: '用户更新成功', user });
  } else {
    res.status(404).json({ success: false, message: '用户不存在' });
  }
});

// 删除用户
app.delete('/users/:id', authenticateJWT, (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.json({ success: true, message: '用户删除成功' });
  } else {
    res.status(404).json({ success: false, message: '用户不存在' });
  }
});

// 获取角色列表
app.get('/roles', authenticateJWT, (req, res) => {
  res.json(roles);
});

// 添加角色
app.post('/roles', authenticateJWT, (req, res) => {
  const { roleName, permissions } = req.body;
  const newRole = { id: uuidv4(), roleName, permissions };
  roles.push(newRole);
  res.json({ success: true, message: '角色添加成功', role: newRole });
});

// 修改角色
app.put('/roles/:id', authenticateJWT, (req, res) => {
  const { roleName, permissions } = req.body;
  const role = roles.find(role => role.id === req.params.id);
  if (role) {
    role.roleName = roleName;
    role.permissions = permissions;
    res.json({ success: true, message: '角色更新成功', role });
  } else {
    res.status(404).json({ success: false, message: '角色不存在' });
  }
});

// 删除角色
app.delete('/roles/:id', authenticateJWT, (req, res) => {
  const roleIndex = roles.findIndex(role => role.id === req.params.id);
  if (roleIndex > -1) {
    roles.splice(roleIndex, 1);
    res.json({ success: true, message: '角色删除成功' });
  } else {
    res.status(404).json({ success: false, message: '角色不存在' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
