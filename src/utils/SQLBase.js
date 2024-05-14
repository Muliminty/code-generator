class SQLBase {

  constructor(tableName, tableStructure) {
    this.tableName = tableName;
    this.tableStructure = tableStructure;
  }

  // 创建记录
  create(data) {
    const columns = [];
    const values = [];

    for (const column of this.tableStructure) {
      columns.push(column.name);
      values.push(data[column.name] || null);
    }

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;
    return { sql, values };
  }

  // 读取记录
  readRecord(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return { sql, values: [id] };
  }

  // 更新记录
  updateRecord(id, data) {
    const updates = [];

    for (const column of this.tableStructure) {
      if (data.hasOwnProperty(column.name)) {
        updates.push(`${column.name} = ?`);
      }
    }

    const sql = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`;
    const values = this.tableStructure.map(column => data[column.name] || null);
    values.push(id);

    return { sql, values };
  }

  // 删除记录
  deleteRecord(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    return { sql, values: [id] };
  }

  // 查询全部数据
  selectAllRecords() {
    const sql = `SELECT * FROM ${this.tableName}`;
    return { sql, values: [] };
  }

  // 根据查询项查询数据和分页查询合并成一个函数
  selectRecordsWithFilterAndPagination(filters, page, pageSize) {
    let p = Number(page) || 1;
    let ps = Number(pageSize) || 10;
    const conditions = [];
    const values = [];

    for (const key in filters) {
      if (typeof filters[key] === 'string') {
        conditions.push(`${key} = ?`);
        values.push(filters[key]);
      } else {
        conditions.push(`${filters[key].column} = ?`);
        values.push(filters[key].value);
      }
    }


    const offset = (p - 1) * ps;
    const sql = `SELECT * FROM ${this.tableName} WHERE ${conditions.join(' AND ')} LIMIT ?, ?`;
    values.push(offset, ps);

    return { sql, values };
  }
}

module.exports = {
  SQLBase
};

