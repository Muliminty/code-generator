const { db } = require('../utils/db');

const { SQLBase } = require('../utils/SQLBase');

// 示例用法
const { USER_TABLE } = require('../enums/database');

const userCRUD = new SQLBase('users', USER_TABLE);

const User = {
  create: (params, callback) => {
    try {
      const { sql, values } = userCRUD.create(params);
      db.run(sql, values, callback);
    } catch (error) {
      console.log('error: ', error);
    }
  },
  // 分页查询用户
  getByPage: ({ page, pageSize, ...filters }, callback) => {
    try {
      const { sql, values } = userCRUD.buildFilteredPaginationQuery({ ...filters }, page, pageSize);
      db.all(sql, values, callback);
    } catch (error) {
      console.log('error: ', error);
    }
  },

  // 获取所有用户
  getAll: (callback) => {
    try {
      const { sql, values } = userCRUD.selectAllRecords();
      db.all(sql, values, callback);
    } catch (error) {
      console.log('error: ', error);
    }
  },

  // 更新用户信息
  update: (id, data, callback) => {
    try {
      const { sql, values } = userCRUD.updateRecord(id, data);
      db.run(sql, values, callback);
    } catch (error) {
    }
  },

  // 删除用户
  delete: (id, callback) => {
    try {
      const { sql, values } = userCRUD.deleteRecord(id);
      db.run(sql, values, callback);
    } catch (error) {
    }
  },

  // 查询数据详情
  getDetailById: (id, callback) => {
    try {
      const { sql, values } = userCRUD.readRecord(id);
      db.get(sql, values, callback);
    } catch (error) {
      console.log('error: ', error);
    }
  }

}

module.exports = User;
