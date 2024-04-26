const { db } = require('../utils/db');

const Model = {
  /**
   * 分页查询模块
   * @param {number} page - 页码
   * @param {number} pageSize - 每页数量
   * @param {function} callback - 回调函数
   */
  getByPage: (page, pageSize, callback) => {
    const offset = (page - 1) * pageSize;
    db.all('SELECT * FROM code_model LIMIT ? OFFSET ?', [pageSize, offset], (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  /**
   * 获取所有模块
   * @param {function} callback - 回调函数
   */
  getAll: (callback) => {
    db.all('SELECT * FROM code_model', (err, rows) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, rows);
    });
  },

  /**
   * 创建模块
   * @param {string} name - 代码
   * @param {string} remark - 备注
   * @param {number} moduleId - 模块ID
   * @param {function} callback - 回调函数
   */
  create: (name, remark, moduleId, callback) => {
    const sql = `
      INSERT INTO code_model (name, remark, created_at, moduleId)
      VALUES (?, ?, CURRENT_TIMESTAMP, ?)
    `;
    db.run(sql, [name, remark, moduleId], (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  },

  /**
   * 更新模块信息
   * @param {number} id - 模块ID
   * @param {string} name - 代码
   * @param {string} remark - 备注
   * @param {number} moduleId - 模块ID
   * @param {function} callback - 回调函数
   */
  update: (id, name, remark, moduleId, callback) => {
    const sql = 'UPDATE code_model SET name = ?, remark = ?, moduleId = ? WHERE id = ?';
    db.run(sql, [name, remark, moduleId, id], (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  },

  /**
   * 删除模块
   * @param {number} id - 模块ID
   * @param {function} callback - 回调函数
   */
  delete: (id, callback) => {
    const sql = 'DELETE FROM code_model WHERE id = ?';
    db.run(sql, id, (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  }
};

module.exports = Model;
