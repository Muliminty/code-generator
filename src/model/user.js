const User = require('../model/userModel');

// 获取数据库数据
const columns = () => {
  return new Promise((resolve, reject) => {
    User.getAll((err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

// 使用 async/await 来等待 columns 函数的结果
const data = async () => {
  try {
    const users = await columns(); // 等待 columns 函数的结果
    return {
      "modelName": "user",// java模块名
      "tableName": "UserTable",// 前端组件名
      "columns": users // 将用户数据作为 columns 返回
    };
  } catch (err) {
    console.error('Error getting columns:', err);
    return {
      "modelName": "user",
      "tableName": "UserTable",
      "columns": []
    };
  }
};

module.exports = {
  data: data // 直接调用 data 函数
};
