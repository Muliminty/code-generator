const express = require('express');
const app = express();
const port = 3000;

// 定义一个 GET 请求的路由
app.get('/api/hello', (req, res) => {
  res.send('Hello, World!');
});

// 监听端口
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
