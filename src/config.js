const UserTable = require('../src/model/user.json');


// 配置文件
module.exports = {
  templates: [
    // 前端模板
    {
      "templateName": "proTable.txt",
      "outSuffix": ".js",
      "outPath": "/src/template/web",
      'targetPath': 'output/template',
      "dataSource": UserTable
      //覆盖文件
      // overwrite: true
    }
  ]
};
