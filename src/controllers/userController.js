const User = require('../model/userModel');

const userController = {
  // 分页查询用户
  getUsersByPage: (req, res) => {
    try {
      console.log('req: ', req);
      // 从查询参数中获取页码和每页条目数量
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);

      // 调用 User 模型中的 getByPage 方法进行分页查询
      User.getByPage(page, pageSize, (err, users) => {
        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          res.status(500).json({ error: err.message });
          return;
        }
        // 如果成功获取用户，以 JSON 格式返回用户数据
        res.json(users);
      });
    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      res.status(500).json({ error: error.message });
    }
  },
  // 获取所有用户
  getAllUsers: (req, res) => {
    // 调用 User 模型中的 getAll 方法从数据库中获取所有用户
    User.getAll((err, users) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功获取用户，以 JSON 格式返回用户数据
      res.json(users);
    });
  },
  // 创建用户
  createUser: (req, res) => {
    // 从请求体中获取用户名和邮箱
    const { username, email } = req.query;
    console.log('req.query: ', req.query);
    // 调用 User 模型中的 create 方法创建新用户
    User.create(username, email, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功创建用户，发送成功消息
      res.send('User created successfully');
    });
  },
  // 更新用户信息
  updateUser: (req, res) => {
    try {
      // 获取要更新的用户的 ID
      const id = Number(req.params.id);

      // 检查是否提供了要更新的用户名和邮箱
      if (!req.body.username || !req.body.email) {
        res.status(400).json({ error: "Missing username or email in request body" });
        return;
      }

      // 从请求体中获取新的用户名和邮箱
      const { username, email } = req.body;

      // 调用 User 模型中的 update 方法更新用户信息
      User.update(id, username, email, (err) => {
        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          res.status(500).json({ error: err.message });
          return;
        }
        // 如果成功更新用户信息，发送成功消息
        res.send('User updated successfully');
      });
    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      res.status(500).json({ error: error.message });
    }
  },

  // 删除用户
  deleteUser: (req, res) => {
    // 获取要删除的用户的 ID
    const id = req.params.id;
    // 调用 User 模型中的 delete 方法删除用户
    User.delete(id, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功删除用户，发送成功消息
      res.send('User deleted successfully');
    });
  }
};

module.exports = userController;
