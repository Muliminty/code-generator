const { db } = require('../utils/db');

const ModuleProps = {
  /**
   * 分页查询模块
   * @param {number} page - 页码
   * @param {number} pageSize - 每页数量
   * @param {function} callback - 回调函数
   */

  getByPage: (page, pageSize, params, callback) => {
    // 查询总记录数
    db.get('SELECT COUNT(*) AS total FROM code_model_props', (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        const totalCount = row.total;
        // 计算查询偏移量
        const offset = (page - 1) * pageSize;
        // 构建 SQL 查询语句
        let sql = 'SELECT * FROM code_model_props';
        const sqlParams = [];
        // 如果存在查询条件，则添加 WHERE 子句
        if (params && params.modelId) {
          sql += ' WHERE modelId = ?';
          sqlParams.push(params.modelId);
        }
        sql += ` LIMIT ? OFFSET ?`;
        sqlParams.push(pageSize, offset);

        // 使用 db 模块的 all 方法执行 SQL 查询，根据分页参数获取模块数据
        db.all(sql, sqlParams, (err, rows) => {
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
   * 获取所有模块
   * @param {function} callback - 回调函数
   */
  getAllByModelId: (modelId, callback) => {
    db.all('SELECT * FROM code_model_props WHERE ModelId = ?', [modelId], (err, rows) => {
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
  update: (id, fields, callback) => {
    // `fields` 是一个对象，其中键是字段名，值是要更新的值
    const keys = Object.keys(fields);
    const placeholders = keys.map(key => `${key} = ?`).join(', ');

    const sql = `UPDATE code_model_props SET ${placeholders} WHERE id = ?`;

    // 获取字段的值，然后将 `id` 作为最后一个值
    const values = keys.map(key => fields[key]).concat(id);

    db.run(sql, values, (err) => {
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
