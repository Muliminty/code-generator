const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './db/user.db';

const USER_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'title', type: 'TEXT' },
  { name: 'username', type: 'TEXT' },
  { name: 'email', type: 'TEXT' },
  { name: 'password', type: 'TEXT' },
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
  { name: 'updated_at', type: 'TEXT' },
];

const db = new sqlite3.Database(
  DB_PATH,
  (err) => {
    if (err) {
      return console.error('连接数据库失败：', err);
    } else {
      console.log('成功连接到数据库');
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
