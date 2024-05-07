
module.exports = {
  templates: [
    // 前端模板 
    {
      "templateName": "ProTableTemp.txt",// 读取的模板文件名
      "fileName": "Table",// 生成文件名
      "outSuffix": ".js",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web/src/page/modelName',// 生成路径
    },
    {
      "templateName": "style.txt",// 读取的模板文件名
      "fileName": "",// 生成文件名
      "outSuffix": ".scss",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web/src/assets/scss',// 生成路径
    },
    {
      "templateName": "api.txt",// 读取的模板文件名
      "fileName": "",// 生成文件名
      "outSuffix": ".js",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web/src/api',// 生成路径
    },
    {
      "templateName": "router.txt",// 读取的模板文件名
      "fileName": "",// 生成文件名
      "outSuffix": ".js",// 生成文件后缀
      "outPath": "/src/template/web",// 模板路径
      'targetPath': '/output/template/web/src/router',// 生成路径
    },
  ],
  templatesService: [
    {
      "templateName": "Controller.java",// 读取的模板文件名
      "fileName": "Controller",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/controller",// 模板路径
      'targetPath': `/output/template/service/controller`,// 生成路径

    },
    {
      "templateName": "Dao.java",// 读取的模板文件名
      "fileName": "Dao",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/dao",// 模板路径
      'targetPath': `/output/template/service/dao`,// 生成路径

    },
    {
      "templateName": "model.java",// 读取的模板文件名
      "fileName": '',// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/model",// 模板路径
      'targetPath': `/output/template/service/model`,// 生成路径

    },
    {
      "templateName": "Service.java",// 读取的模板文件名
      "fileName": "Service",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/service",// 模板路径
      'targetPath': `/output/template/service/service`,// 生成路径

    },
    {
      "templateName": "ServiceImpl.java",// 读取的模板文件名
      "fileName": "ServiceImpl",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/service/impl",// 模板路径
      'targetPath': `/output/template/service/service/impl`,// 生成路径

    },
    {
      "templateName": "ConditionVo.java",// 读取的模板文件名
      "fileName": "ConditionVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/vo`,// 生成路径

    },
    {
      "templateName": "CreateVo.java",// 读取的模板文件名
      "fileName": "CreateVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/vo`,// 生成路径

    },
    {
      "templateName": "GetVo.java",// 读取的模板文件名
      "fileName": "GetVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/vo`,// 生成路径
    },
    {
      "templateName": "PageVo.java",// 读取的模板文件名
      "fileName": "PageVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/vo`,// 生成路径
    },
    {
      "templateName": "UpdateVo.java",// 读取的模板文件名
      "fileName": "UpdateVo",// 生成文件名
      "outSuffix": ".java",// 生成文件后缀
      "outPath": "/src/template/service/vo",// 模板路径
      'targetPath': `/output/template/service/vo`,// 生成路径
    },
  ]
};
