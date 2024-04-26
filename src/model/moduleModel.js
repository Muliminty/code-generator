const { db } = require('../utils/db');

const Module = {
  // 分页查询模块  
  getByPage: (page, pageSize, callback) => {
    // 计算查询偏移量
    const offset = (page - 1) * pageSize;
    // 使用 db 模块的 all 方法执行 SQL 查询，根据分页参数获取模块数据
    db.all('SELECT * FROM code_module LIMIT ? OFFSET ?', [pageSize, offset], callback);
  },
  // 获取所有模块
  getAll: (callback) => {
    // 使用 db 模块的 all 方法执行 SQL 查询，从数据库中获取所有模块数据
    db.all('SELECT * FROM code_module', callback);
  },
  // 创建模块
  create: (code, name, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 插入语句，向 code_module 表中插入新模块的模块名、邮箱和创建时间
    db.run('INSERT INTO code_module (code, name, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [code, name], callback);
  },


  // 更新模块信息
  update: (id, code, name, sortNum, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 更新语句，更新指定 ID 的模块的代码、名称和排序号
    db.run('UPDATE code_module SET code = ?, name = ?, sortNum = ? WHERE id = ?', [code, name, sortNum, id], callback);
  },

  // 删除模块
  delete: (id, callback) => {
    // 使用 db 模块的 run 方法执行 SQL 删除语句，删除指定 ID 的模块
    db.run('DELETE FROM code_module WHERE id = ?', id, callback);
  }
};

module.exports = Module;
