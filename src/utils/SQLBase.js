class SQLBase {

  constructor(tableName, tableStructure) {
    this.tableName = tableName;
    this.tableStructure = tableStructure;
  }

  /**
   * 新增数据SQL语句构建。
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


  /**
   * 支持分页和条件查询的 SQL 查询语句构建。
   * @param {Object} filters - 过滤器对象，键为列名，值为要匹配的值。
   * @param {number} page - 要查询的页码，默认为 1。
   * @param {number} pageSize - 每页的数量，默认为 10。
   * @returns {Object} - 包含构建的 SQL 查询语句和参数值数组的对象。
   */
  buildFilteredPaginationQuery(filters, page, pageSize) {
    // 将页码和每页大小转换为数字，如果未提供，则默认为1和10
    const p = Number(page) || 1;
    const ps = Number(pageSize) || 10;
    const conditions = []; // 存储条件语句的数组
    const values = []; // 存储参数值的数组

    // 遍历过滤器对象的键值对
    for (const key in filters) {
      if (filters[key] !== '') { // 检查过滤器的值是否为空字符串
        conditions.push(`${key} = ?`); // 添加等值查询条件
        values.push(filters[key]); // 将过滤器的值添加到参数值数组中
      }
    }

    // 计算偏移量
    const offset = (p - 1) * ps;

    let sql = `SELECT * FROM ${this.tableName}`; // 初始 SQL 查询语句

    // 如果存在过滤条件，则在查询语句中添加 WHERE 子句
    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` LIMIT ?, ?`; // 添加分页限制
    values.push(offset, ps); // 将偏移量和每页大小添加到参数值数组中

    // 返回构建的 SQL 查询语句和参数值数组
    return { sql, values };
  }


  /**
   * 构建查询所有记录的 SQL 查询语句。
   * @returns {Object} - 包含构建的 SQL 查询语句和空参数值数组的对象。
   */
  selectAllRecords() {
    const sql = `SELECT * FROM ${this.tableName}`;
    return { sql, values: [] };
  }


  /**
   * 构建更新数据SQL语句。
   * @param {number} id - 要更新的记录的 ID。
   * @param {object} data - 包含要更新的列及其对应新值的对象。
   * @returns {object} - 返回一个包含 SQL 查询字符串和参数值数组的对象。
   */
  updateRecord(id, data) {
    // 输出日志，以便调试

    // 用于存储更新的列和对应的值的数组
    const updates = [];

    // 遍历表结构中的每一列
    for (const column of this.tableStructure) {
      // 如果传入的数据中包含当前列名，则将该列添加到更新列表中
      if (data.hasOwnProperty(column.name)) {
        updates.push(`${column.name} = ?`);
      }
    }

    // 构建 SQL 更新语句
    const sql = `UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`;

    // 仅将传递的值添加到参数值数组
    const values = updates.map(update => data[update.split(' ')[0]]);

    // 将记录 ID 添加到参数值数组的末尾
    values.push(id);

    // 返回包含 SQL 查询字符串和参数值数组的对象
    return { sql, values };
  }



  // 删除记录
  deleteRecord(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    return { sql, values: [id] };
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
}

module.exports = {
  SQLBase
};

