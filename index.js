const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const modelRoutes = require('./src/routes/modelRoutes');
const modelPropsRoutes = require('./src/routes/modelPropsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const paginationMiddleware = require('./src/middleware/paginationMiddleware');

app.use(express.static(__dirname + '/output'));

// 允许所有来源访问
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 使用 body-parser 中间件来解析 URL 编码和 JSON 格式的请求主体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 使用分页中间件
app.use(paginationMiddleware);

// 代码生成配置demo  将用户路由映射到 /users 路径
app.use('/users', userRoutes);

// 将模块路由映射到 /module 路径
app.use('/module', moduleRoutes);

// 将模块路由映射到 /module 路径
app.use('/model', modelRoutes);

// 将模型路由映射到 /model 路径
app.use('/modelProps', modelPropsRoutes);

// 启动服务器，监听指定的端口
app.listen(PORT, () => {
  console.log(`服务器正在端口上运行 http://localhost:${PORT}`);
});
