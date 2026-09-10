<h1 style="text-align: center" style='font-size: 40px'>
    <a href="https://gitee.com/daiso_1/daiso" style="text-decoration: none; color: black;">ArtLearn综合艺术学习与商业平台</a>
</h1>

<div style="text-align: center">
    <img src="https://img.shields.io/badge/License-Apache2.0-green" alt="">
    <img src="https://img.shields.io/badge/Version-dev-blue" alt="">
</div>
<div style="text-align: center">
    <img src="https://img.shields.io/badge/Member-IvanHorn(Ivanluv555)-gold" alt="">
    <img src="https://img.shields.io/badge/Member-Atopos(vulinh190291png)-aqua" alt="">
</div>

一个面向艺术爱好者和学习者的综合性平台，提供艺术作品浏览、在线购物、社区交流等功能。项目采用前后端分离架构，包含管理后台和移动端应用。

## 项目结构

```
ArtLearn/
├── hy-all/              # 后端服务 (Spring Boot)
├── hy-admin-web/        # 管理后台 (Vue 3)
├── hy-app/              # 移动端应用 (UniApp)
├── hy-con/              # 配置文件/其他资源
└── docs/                # 项目文档
```

## 技术栈

### 后端 (hy-all)

- **框架**: Spring Boot 3.3.7
- **开发语言**: Java 17
- **数据库**: MySQL
- **ORM**: Spring Data JPA
- **认证**: JWT (JSON Web Token)
- **实时通信**: WebSocket
- **API文档**: Knife4j (OpenAPI 3)
- **工具库**: Lombok

### 前端管理后台 (hy-admin-web)

- **框架**: Vue 3
- **构建工具**: Vite 4
- **UI组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP客户端**: Axios
- **样式**: Sass

### 移动端 (hy-app)

- **框架**: UniApp
- **HTTP客户端**: Axios + UniApp适配器
- **工具库**: Day.js

## 核心功能模块

- **用户系统**: 用户注册、登录、个人信息管理
- **艺术分类**: 多级艺术品分类管理
- **商品管理**: 艺术品/商品的发布、编辑、展示
- **购物车**: 商品收藏与购物车管理
- **订单系统**: 订单创建、支付、物流跟踪
- **地址管理**: 收货地址的增删改查
- **社区互动**: 用户发帖、交流、分享
- **徽章系统**: 用户成就与激励机制

## 快速开始

### 环境要求

- **后端**: JDK 17+, Maven 3.6+, MySQL 8.0+
- **前端管理**: Node.js 16+, npm/yarn
- **移动端**: HBuilderX 或 CLI 开发环境

### 后端启动

1. 配置环境变量（或在IDE中设置）：
   ```bash
   export DB_URL=jdbc:mysql://localhost:3306/artlearn?useSSL=false&serverTimezone=Asia/Shanghai
   export DB_USERNAME=your_username
   export DB_PASSWORD=your_password
   export JWT_SECRET=your_jwt_secret_key
   export JPA_DDL_AUTO=update  # 首次运行使用update，后续使用validate
   export SHOW_SQL=true        # 可选，开发时查看SQL
   ```

2. 进入后端目录并启动：
   ```bash
   cd hy-all
   mvn clean install
   mvn spring-boot:run
   ```

3. 访问 API 文档：
    - Swagger UI: http://localhost:8080/doc.html

### 管理后台启动

```bash
cd hy-admin-web
npm install
npm run dev
```

访问地址：http://localhost:5173

### 移动端启动

```bash
cd hy-app
npm install
# 使用 HBuilderX 打开项目，或使用 CLI 运行
```

## 构建部署

### 后端打包

```bash
cd hy-all
mvn clean package
# 生成的jar包位于 target/hy-all-0.0.1-SNAPSHOT.jar
java -jar target/hy-all-0.0.1-SNAPSHOT.jar
```

### 前端打包

```bash
cd hy-admin-web
npm run build
# 生成的文件位于 dist/ 目录
```

### 移动端打包

在 HBuilderX 中选择"发行"功能，或使用 CLI 打包。

## 配置说明

### 数据库配置

项目使用环境变量配置数据库连接，支持外部化配置。主要环境变量：

- `DB_URL`: 数据库连接地址
- `DB_USERNAME`: 数据库用户名
- `DB_PASSWORD`: 数据库密码
- `JWT_SECRET`: JWT密钥（建议使用64位以上随机字符串）
- `JPA_DDL_AUTO`: Hibernate DDL策略（validate/update/create）
- `SHOW_SQL`: 是否显示SQL语句（true/false）

### 跨域配置

后端已配置WebConfig支持跨域请求，前端开发时可直接调用API。

## API文档

项目集成了 Knife4j，启动后端服务后访问：

- http://localhost:8080/doc.html

可在线测试所有API接口。

## 团队协作

- **分支策略**: 使用Git Flow工作流
- **提交规范**: 遵循Conventional Commits
- **代码审查**: 通过Pull Request进行代码审查

## 问题反馈

如遇到问题，请提交 Issue 或联系项目维护者。


---

**开发者**: Ivan Horn  
**最后更新**: 2026-09-10
