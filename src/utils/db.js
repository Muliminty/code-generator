const { MODULE_TABLE, MODEL_TABLE, MODEL_PROPS_TABLE, USER_TABLE } = require('../enums/database');

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './db/database.db';// 数据库文件路径
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('连接数据库失败：', err);
  } else {
    console.log('成功连接到数据库');
    createTables();
  }
});

/**
 * 创建数据库表格
 * @param {string} tableName - 表格名称
 * @param {MODULE_TABLE} columns - 列定义
 * @returns {Promise<void>} - 返回一个 Promise，表示表格创建操作的结果
 */
function createTable(tableName, columns) {
  return new Promise((resolve, reject) => {
    // 检查参数的有效性
    if (!tableName || !Array.isArray(columns) || columns.length === 0) {
      reject(new Error('无效的表名或列'));
      return;
    }

    // 构建列定义字符串
    const columnDefs = columns.map(column => {
      let columnDef = `${column.name} ${column.type}`;
      // 检查是否需要自增
      if (column.autoIncrement === 'AUTOINCREMENT') {
        columnDef += ' AUTOINCREMENT';
      }
      return columnDef;
    }).join(', ');

    // 构建创建表格的 SQL 语句
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefs})`;

    // 执行 SQL 语句来创建表格
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
    await createTable('users', USER_TABLE);
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
