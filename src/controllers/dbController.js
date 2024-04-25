const Db = require('../model/dbModel');

const dbController = {
  // 创建表格
  createTable: async (req, res) => {
    const { tableName, columns } = req.body;
    try {
      await Db.createTable(tableName, columns);
      res.status(200).send(`表格 ${tableName} 创建成功`);
    } catch (error) {
      res.status(500).send(`无法创建表格 ${tableName}: ${error.message}`);
    }
  },

  // 删除表格
  dropTable: async (req, res) => {
    const { tableName } = req.body;
    try {
      await Db.dropTable(tableName);
      res.status(200).send(`表格 ${tableName} 删除成功`);
    } catch (error) {
      res.status(500).send(`无法删除表格 ${tableName}: ${error.message}`);
    }
  },

  // 插入数据
  insertData: async (req, res) => {
    const { tableName, data } = req.body;
    try {
      const insertedId = await Db.insertData(tableName, data);
      res.status(200).send(`数据插入成功，ID为 ${insertedId}`);
    } catch (error) {
      res.status(500).send(`无法插入数据到表格 ${tableName}: ${error.message}`);
    }
  },

  // 查询数据
  fetchData: async (req, res) => {
    const { tableName, conditions } = req.body;
    try {
      const result = await Db.fetchData(tableName, conditions);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(`无法查询表格 ${tableName}: ${error.message}`);
    }
  }
};

module.exports = dbController;
