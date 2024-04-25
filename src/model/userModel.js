const { db } = require('../utils/db');

const User = {
  // 获取所有用户
  getAll: (callback) => {
    // 使用 db 模块的 all 方法执行 SQL 查询，从数据库中获取所有用户数据
    db.all('SELECT * FROM users', callback);
  },
  // 创建用户
  create: (username, email, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 插入语句，向 users 表中插入新用户的用户名和邮箱
    db.run('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], callback);
  },
  // 更新用户信息
  update: (id, username, email, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 更新语句，更新指定 ID 的用户的用户名和邮箱
    db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], callback);
  },
  // 删除用户
  delete: (id, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 删除语句，删除指定 ID 的用户
    db.run('DELETE FROM users WHERE id = ?', id, callback);
  }
};

module.exports = User;
