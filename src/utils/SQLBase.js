class SQLBase {

  constructor(tableName, tableStructure) {
    this.tableName = tableName;
    this.tableStructure = tableStructure;
  }

  /**
   * 将给定数据插入到数据库表中，并返回对应的 SQL 查询和值。
   * @param {object} data 要插入的数据对象，键为列名，值为要插入的值。
   * @returns {object} 包含 SQL 查询和对应值的对象。
   * @throws {Error} 如果输入数据或表结构无效，则抛出错误。
   */
  create(data) {
    // 验证输入数据和表结构的有效性
    if (typeof data !== 'object' || !Array.isArray(this.tableStructure)) {
      throw new Error('输入数据或表结构无效。');
    }

    const columns = [];
    const values = [];

    // 遍历表结构并构建 columns 和 values 数组
    this.tableStructure.forEach(({ name, type }) => {
      // 跳过自增的 ID 列
      if (type.includes('INTEGER PRIMARY KEY AUTOINCREMENT')) {
        return;
      }

      // 检查数据中是否包含该列的值
      if (data.hasOwnProperty(name)) {
        columns.push(name);
        values.push(data[name]);
      } else {
        // 如果数据中不包含该列的值，但是该列有默认值，直接跳过
        if (type.includes('DEFAULT')) {
          return;
        }

        // 当缺少值时添加 null 到 values 数组
        columns.push(name);
        values.push(null);
      }
    });

    // 使用模板字符串简化 SQL 构建，省略自增的 ID 列和包含默认值的列
    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;

    return { sql, values };
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


  /**
   * 从数据库中读取指定 ID 的记录。
   * @param {number} id 要读取的记录的 ID。
   * @returns {object} 包含 SQL 查询和对应值的对象。
   */
  readRecord(id) {
    // 构建 SQL 查询，仅选择指定 ID 的记录
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


}

module.exports = {
  SQLBase
};

