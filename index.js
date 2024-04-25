const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
// const db = require('./src/utils/db');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const paginationMiddleware = require('./src/middleware/paginationMiddleware');

// 使用 body-parser 中间件来解析 URL 编码和 JSON 格式的请求主体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用分页中间件
app.use(paginationMiddleware);

// 将用户路由映射到 /users 路径
app.use('/users', userRoutes);

// 启动服务器，监听指定的端口
app.listen(PORT, () => {
  console.log(`服务器正在端口上运行 http://localhost:${PORT}`);
});