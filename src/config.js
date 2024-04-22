const { date } = require('./model/user');


// 配置文件
module.exports = {
  templates: [
    // 前端模板 
    {
      "templateName": "ProTableTemp.txt",// 读取的模板文件名
      "fileName": "ProTableTemp",// 生成文件名
      "outSuffix": ".js",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web',// 生成路径
      "dataSource": date
    },
    {
      "templateName": "style.txt",// 读取的模板文件名
      "fileName": "style",// 生成文件名
      "outSuffix": ".scss",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web',// 生成路径
      "dataSource": date
    }
  ],
  templatesService: [

  ]
};
