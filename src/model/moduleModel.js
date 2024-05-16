// const { db } = require('../utils/db');

// const Module = {
//   getByPage: (page, pageSize, callback) => {
//     // 查询总记录数
//     db.get('SELECT COUNT(*) AS total FROM code_module', (err, row) => {
//       if (err) {
//         callback(err, null);
//       } else {
//         const totalCount = row.total;
//         // 计算查询偏移量
//         const offset = (page - 1) * pageSize;
//         // 使用 db 模块的 all 方法执行 SQL 查询，根据分页参数获取模块数据
//         db.all('SELECT * FROM code_module LIMIT ? OFFSET ?', [pageSize, offset], (err, rows) => {
//           if (err) {
//             callback(err, null);
//           } else {
//             callback(null, { totalCount, list: rows });
//           }
//         });
//       }
//     });
//   },
//   // 获取所有模块
//   getAll: (callback) => {
//     // 使用 db 模块的 all 方法执行 SQL 查询，从数据库中获取所有模块数据
//     db.all('SELECT * FROM code_module', callback);
//   },
//   // 创建模块
//   create: (code, name, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 插入语句，向 code_module 表中插入新模块的模块名、邮箱和创建时间
//     db.run('INSERT INTO code_module (code, name, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)', [code, name], callback);
//   },


//   // 更新模块信息
//   update: (id, code, name, sortNum, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 更新语句，更新指定 ID 的模块的代码、名称和排序号
//     db.run('UPDATE code_module SET code = ?, name = ?, sortNum = ? WHERE id = ?', [code, name, sortNum, id], callback);
//   },

//   // 删除模块
//   delete: (id, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 删除语句，删除指定 ID 的模块
//     db.run('DELETE FROM code_module WHERE id = ?', id, callback);
//   }
// };

// module.exports = Module;


const { db } = require('../utils/db');

const { SQLBase } = require('../utils/SQLBase');

// 示例用法
const { MODULE_TABLE } = require('../enums/database');

const SQL = new SQLBase('code_module', MODULE_TABLE);

const Module = {
  getByPage: ({ page, pageSize, ...filters }, callback) => {
    try {
      // 查询总记录数
      const countQuery = SQL.selectAllRecords();
      db.all(countQuery.sql, countQuery.values, (err, totalCountRows) => {
        if (err) {
          callback(err, null);
          return;
        }

        const totalCount = totalCountRows.length;
        const paginationQuery = SQL.buildFilteredPaginationQuery({ ...filters }, page, pageSize);

        db.all(paginationQuery.sql, paginationQuery.values, (err, rows) => {
          if (err) {
            callback(err, null);
            return;
          }

          callback(null, { totalCount, list: rows });
        });
      });
    } catch (error) {
      console.log('error: ', error);
    }
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