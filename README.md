# 信息管理系统

1. 这是一个基于 React 和 Node.js 的信息管理系统，具有以下功能：
2. 用户登录和注册
3. 菜单管理（增删改查）
4. 用户管理（增删改查并分配角色）
5. 角色管理（增删改查并分配菜单权限）
6. 权限管理（用户登录后只能看到并且只能访问有权限的菜单）

## 项目目录结构

frontend/
|-- src/
| |-- components/
| | |-- Dashboard.js
| | |-- Login.js
| | |-- Register.js
| | |-- MenuManagement.js
| | |-- UserManager.js
| | |-- RoleManager.js
| |-- mockData.js
| |-- utils.js
| |-- App.js
| |-- index.js
backend/
|-- server.js

markdown
复制代码

## 使用的插件

### 前端
- React
- React Router DOM
- Ant Design
- CryptoJS

### 后端
- Express
- Body-Parser
- Bcryptjs
- Jsonwebtoken
- UUID

## 组件使用说明

### 前端
- `Login` 组件：用于用户登录
- `Register` 组件：用于用户注册
- `Dashboard` 组件：登录后的主界面
- `MenuManagement` 组件：菜单管理功能
- `UserManager` 组件：用户管理功能
- `RoleManager` 组件：角色管理功能

### 后端
- `server.js`：Node.js 后端服务，包括用户、菜单和角色的增删改查接口

## 项目运行启动方式

### 前端
1. 克隆项目代码到本地：
    ```sh
    git clone https://github.com/lairifangtang/management-website.git
    ```
2. 进入前端项目目录并安装依赖：
    ```sh
    cd your-repo-name/frontend
    npm install
    ```
3. 运行前端项目：
    ```sh
    npm start
    ```
4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看前端项目。

### 后端
1. 进入后端项目目录并安装依赖：
    ```sh
    cd your-repo-name/backend
    npm install
    ```
2. 运行后端项目：
    ```sh
    node server.js
    ```
3. 后端服务将在 [http://localhost:3001](http://localhost:3001) 运行。
