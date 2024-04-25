const { db } = require('../utils/db');

// 创建表格
function createTable(tableName, columns) {
  return new Promise((resolve, reject) => {
    const columnDefs = columns.map(column => `${column.name} ${column.type}`).join(', ');
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`;
    db.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 删除表格
function dropTable(tableName) {
  return new Promise((resolve, reject) => {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;
    db.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 插入数据
function insertData(tableName, data) {
  return new Promise((resolve, reject) => {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(val => `'${val}'`).join(', ');
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // 返回插入的行的ID
      }
    });
  });
}

// 查询数据
function fetchData(tableName, conditions = {}) {
  return new Promise((resolve, reject) => {
    const conditionColumns = Object.keys(conditions).map(col => `${col} = '${conditions[col]}'`).join(' AND ');
    const sql = `SELECT * FROM ${tableName} ${conditionColumns ? `WHERE ${conditionColumns}` : ''}`;
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const Db = {
  createTable: createTable,
  dropTable: dropTable,
  insertData: insertData,
  fetchData: fetchData,
};

module.exports = Db;
