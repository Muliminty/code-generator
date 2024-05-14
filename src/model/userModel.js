const { db } = require('../utils/db');

// const User = {
//   // 分页查询用户
//   getByPage: (page, pageSize, callback) => {
//     // 计算查询偏移量
//     const offset = (page - 1) * pageSize;
//     // 使用 db 模块的 all 方法执行 SQL 查询，根据分页参数获取用户数据
//     db.all('SELECT * FROM users LIMIT ? OFFSET ?', [pageSize, offset], callback);
//   },
//   // 获取所有用户
//   getAll: (callback) => {
//     // 使用 db 模块的 all 方法执行 SQL 查询，从数据库中获取所有用户数据
//     db.all('SELECT * FROM users', callback);
//   },
//   // 创建用户
//   create: (title, dataIndex, dataType, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 插入语句，向 users 表中插入新用户的用户名、邮箱和创建时间
//     db.run('INSERT INTO users (title, dataIndex, dataType, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [title, dataIndex, dataType], callback);
//   },

//   // 更新用户信息
//   update: (id, username, email, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 更新语句，更新指定 ID 的用户的用户名和邮箱
//     db.run('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], callback);
//   },
//   // 删除用户
//   delete: (id, callback) => {
//     // 使用 db 模块的 run 方法执行 SQL 删除语句，删除指定 ID 的用户
//     db.run('DELETE FROM users WHERE id = ?', id, callback);
//   }
// };

const { SQLBase } = require('../utils/SQLBase');

// 示例用法
const { USER_TABLE } = require('../enums/database');

const userCRUD = new SQLBase('users', USER_TABLE);

const User = {
  create: (params, callback) => {
    console.log('params: ', params);
    try {
      const { sql, values } = userCRUD.create(params);
      console.log('values: ', values);
      console.log('sql: ', sql);
      db.run(sql, values, callback);
    } catch (error) {
      console.log('error: create', error);

    }
  },
  // 分页查询用户
  getByPage: ({ page, pageSize, ...filters }, callback) => {
    try {
      const { sql, values } = userCRUD.selectRecordsWithFilterAndPagination({ ...filters }, page, pageSize);
      db.all(sql, values, callback);
    } catch (error) {
      console.log('error: ', error);
    }

  },
}

// // 创建记录
// const createSQL = userCRUD.create({
//   title: 'Test User',
//   dataIndex: 'test_user',
//   dataType: 'text'
// });
// console.log(createSQL);

// // 读取记录
// const readSQL = userCRUD.read(1);
// console.log(readSQL);

// // 更新记录
// const updateSQL = userCRUD.update(1, { title: 'Updated User' });
// console.log(updateSQL);

// // 删除记录
// const deleteSQL = userCRUD.delete(1);
// console.log(deleteSQL);


module.exports = User;
