const { data } = require('./model/user');


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
      "dataSource": data
    },
    {
      "templateName": "style.txt",// 读取的模板文件名
      "fileName": "style",// 生成文件名
      "outSuffix": ".scss",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web',// 生成路径
      "dataSource": data
    }
  ],
  templatesService: [
    {
      "templateName": "Controller.java",// 读取的模板文件名
      "fileName": "Controller",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/controller",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/controller`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "Dao.java",// 读取的模板文件名
      "fileName": "Dao",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/dao",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/dao`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "model.java",// 读取的模板文件名
      "fileName": '',// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/model",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/model`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "Service.java",// 读取的模板文件名
      "fileName": "Service",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/service",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/service`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "ServiceImpl.java",// 读取的模板文件名
      "fileName": "ServiceImpl",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/service/impl",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/service/impl`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "ConditionVo.java",// 读取的模板文件名
      "fileName": "ConditionVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/vo`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "CreateVo.java",// 读取的模板文件名
      "fileName": "CreateVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/vo`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "GetVo.java",// 读取的模板文件名
      "fileName": "GetVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/vo`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "PageVo.java",// 读取的模板文件名
      "fileName": "PageVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/vo`,// 生成路径
      "dataSource": data
    },
    {
      "templateName": "UpdateVo.java",// 读取的模板文件名
      "fileName": "UpdateVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/${data.modelName}/vo`,// 生成路径
      "dataSource": data
    },
  ]
};
