
const data = {
  "modelName": "user",// java模块名
  "tableName": "UserTable",// 前端组件名
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
