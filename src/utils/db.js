const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './db/database.db';// 数据库文件路径

// 模块表
const MODULE_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'code', type: 'TEXT' },
  { name: 'name', type: 'TEXT' },
  { name: 'sortNum', type: 'INTEGER' },
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
];

// 模型表
const MODEL_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' },
  { name: 'remark', type: 'TEXT' },
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
  { name: 'moduleId', type: 'INTEGER' },
];

// 模型属性表
const MODEL_PROPS_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' },
  { name: 'name', type: 'TEXT' },
  { name: 'remark', type: 'TEXT' },
  { name: 'dataType', type: 'TEXT' },
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' },
  { name: 'modelId', type: 'INTEGER' },
];


const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('连接数据库失败：', err);
  } else {
    console.log('成功连接到数据库');
    createTables();
  }
});

function createTable(tableName, columns) {
  return new Promise((resolve, reject) => {
    if (!tableName || !Array.isArray(columns) || columns.length === 0) {
      reject(new Error('Invalid table name or columns'));
      return;
    }

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

async function createTables() {
  try {
    await createTable('code_module', MODULE_TABLE);
    console.log('成功创建模块表');
    await createTable('code_model', MODEL_TABLE);
    console.log('成功创建模型表');
    await createTable('code_model_props', MODEL_PROPS_TABLE);
    console.log('成功创建模型属性表');
  } catch (error) {
    console.error('创建表格失败：', error);
  }
}

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
