/**
 * 模块表
 * @typedef {Object[]} ModuleTable
 * @property {string} name - 列名
 * @property {string} type - 列类型
 */

/**
 * 模型表
 * @typedef {Object[]} ModelTable
 * @property {string} name - 列名
 * @property {string} type - 列类型
 */

/**
 * 模型属性表
 * @typedef {Object[]} ModelPropsTable
 * @property {string} name - 列名
 * @property {string} type - 列类型
 */



/**
 * 模块表
 * @type {ModuleTable}
 */
const MODULE_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' }, // 模块ID
  { name: 'code', type: 'TEXT' }, // 模块编码
  { name: 'name', type: 'TEXT' }, // 模块名称
  { name: 'sortNum', type: 'INTEGER', autoIncrement: 'INTEGER' }, // 排序号（自增）
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' }, // 创建时间
];

/**
 * 模型表
 * @type {ModelTable}
 */
const MODEL_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' }, // 模型ID
  { name: 'name', type: 'TEXT' }, // 模型名称
  { name: 'remark', type: 'TEXT' }, // 备注
  { name: 'moduleId', type: 'INTEGER' }, // 模块ID
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' }, // 创建时间
];

/**
 * 模型属性表
 * @type {ModelPropsTable}
 */
const MODEL_PROPS_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' }, // 模型属性ID
  { name: 'modelId', type: 'INTEGER' }, // 模型ID
  { name: 'key', type: 'TEXT' }, // 属性键
  { name: 'title', type: 'TEXT' }, // 属性名称
  { name: 'dataType', type: 'TEXT' }, // 数据类型
  { name: 'dataLength', type: 'INTEGER' },// 属性类型长度
  // 是否显示在搜索
  { name: 'showInSearch', type: 'INTEGER' },
  // 是否显示在表单
  { name: 'showInForm', type: 'INTEGER' },
  // 是否表单必填
  { name: 'required', type: 'INTEGER' },
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' }, // 创建时间
];


/**
 * 一个模型属性demo
 */
const USER_TABLE = [
  { name: 'id', type: 'INTEGER PRIMARY KEY AUTOINCREMENT' }, // 用户ID
  { name: 'title', type: 'TEXT' }, // 标题
  { name: 'dataIndex', type: 'TEXT' }, // 数据索引
  { name: 'dataType', type: 'TEXT' }, // 数据类型
  { name: 'created_at', type: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' }, // 创建时间
];

module.exports = {
  USER_TABLE,
  MODULE_TABLE,
  MODEL_TABLE,
  MODEL_PROPS_TABLE,
};
