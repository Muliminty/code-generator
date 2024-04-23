
const data = {
  "modelName": "User",// 模块名
  "tableName": "UserTable",// 表格组件名
  "columns": [
    {
      "title": "ID",
      "dataIndex": "id",
      'dataType': 'String'
    },
    {
      "title": "用户名",
      "dataIndex": "username",
      'dataType': 'String'
    },
    {
      "title": "邮箱",
      "dataIndex": "email",
      'dataType': 'Long'
    }
  ]
}
module.exports = {
  data
};
