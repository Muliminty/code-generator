// // 导入 sqlite3 模块
// const sqlite3 = require('sqlite3').verbose();

// // 数据库文件路径
// const DB_PATH = './db/user.db';

// // 创建数据库连接
// const db = new sqlite3.Database(
//   DB_PATH,
//   (err) => {
//     if (err) {
//       return console.error('连接数据库失败：', err);
//     } else {
//       console.log('成功连接到数据库');
//       // 创建表格（如果表格不存在）
//       db.run(`CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT,
//         email TEXT,
//         password TEXT
//       )`, (err) => {
//         if (err) {
//           console.error('创建用户表失败：', err);
//         } else {
//           console.log('用户表已创建');
//         }
//       });
//     }
//   });

// module.exports = {
//   db: db,
//   // 关闭数据库连接
//   closeConnection: () => {
//     db.close((err) => {
//       if (err) {
//         console.error('Failed to close database connection:', err);
//       } else {
//         console.log('Database connection closed');
//       }
//     });
//   }
// };



const sqlite3 = require('sqlite3').verbose();

const DB_PATH = './db/user.db';

const { createTable } = require('../model/dbModel');

const USER_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'username', type: 'TEXT' },
  { name: 'email', type: 'TEXT' },
  { name: 'password', type: 'TEXT' },
  { name: 'role', type: 'TEXT' },
  { name: 'status', type: 'TEXT' },
  { name: 'created_at', type: 'TEXT' },
  { name: 'updated_at', type: 'TEXT' },
  { name: 'deleted_at', type: 'TEXT' }
]

const db = new sqlite3.Database(
  DB_PATH,
  (err) => {
    if (err) {
      return console.error('连接数据库失败：', err);
    } else {
      console.log('成功连接到数据库');
      // 创建表格（如果表格不存在）
      // createTable('users', USER_TABLE).then(() => {
      //   console.log('用户表已创建');
      // }).catch((err) => {
      //   console.error('创建用户表失败：', err);
      // });
      const tableName = 'users';
      const columnDefs = USER_TABLE.map(USER_TABLE => `${USER_TABLE.name} ${USER_TABLE.type}`).join(', ');
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`;
      db.run(sql, (err) => {
        if (err) {
          console.error('创建用户表失败：', err);
        } else {
          console.log('用户表已创建');
        }
      });
    }
  });


// 关闭数据库连接
function closeConnection() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('Database connection closed');
        resolve();
      }
    });
  });
}

module.exports = {
  db: db,
  closeConnection: closeConnection
};
