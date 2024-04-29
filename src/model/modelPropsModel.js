const { db } = require('../utils/db');

const ModuleProps = {
  /**
   * 分页查询模块
   * @param {number} page - 页码
   * @param {number} pageSize - 每页数量
   * @param {function} callback - 回调函数
   */
  getByPage: (page, pageSize, callback) => {
    // 查询总记录数
    db.get('SELECT COUNT(*) AS total FROM code_model_props', (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        const totalCount = row.total;
        // 计算查询偏移量
        const offset = (page - 1) * pageSize;
        // 使用 db 模块的 all 方法执行 SQL 查询，根据分页参数获取模块数据
        db.all('SELECT * FROM code_model_props LIMIT ? OFFSET ?', [pageSize, offset], (err, rows) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, { totalCount, list: rows });
          }
        });
      }
    });
  },

  /**
   * 获取所有模块
   * @param {function} callback - 回调函数
   */
  getAll: (callback) => {
    db.all('SELECT * FROM code_model_props', (err, rows) => {
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
  create: (modelId, engName, title, dataType, dataLength, showInSearch, showInForm, required, callback) => {
    const sql = `
      INSERT INTO code_model_props (modelId,  engName, title, dataType, dataLength, showInSearch, showInForm, required, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;
    db.run(sql, [modelId, engName, title, dataType, dataLength, showInSearch, showInForm, required], (err) => {
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
    const sql = 'UPDATE code_model_props SET name = ?, remark = ?, moduleId = ? WHERE id = ?';
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
    const sql = 'DELETE FROM code_model_props WHERE id = ?';
    db.run(sql, id, (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  }
};
module.exports = ModuleProps;
