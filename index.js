const fs = require('fs');
const path = require('path');
const { readTemplateFile, generatedTemplateFile, } = require('./src/utils/renderTemplateFile')
const { templates } = require('./src/config')


const processTemplates = () => {

  templates.forEach((i) => {
    const templateContent = readTemplateFile({
      targetPath: `${__dirname}${i.outPath}`,
      name: i.templateName
    })
    // 使用 art-template 渲染模板
    const generatedCode = generatedTemplateFile({
      templateContent: templateContent,
      data: i.dataSource
    })

    // 创建 output 文件夹（如果不存在）
    const outputDir = path.join(__dirname, `${i.targetPath}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // 将生成的代码写入文件
    const outputPath = path.join(outputDir, `${[i.dataSource.tableName]}.js`);
    fs.writeFileSync(outputPath, generatedCode, 'utf-8');

    console.log('代码已生成:', outputPath);
  })

}

processTemplates()