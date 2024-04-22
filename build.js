const fs = require('fs');
const path = require('path');
const { readTemplateFile, generatedTemplateFile, } = require('./src/utils/renderTemplateFile')
const { templates, templatesService } = require('./src/config')


const processTemplates = () => {

  templates.forEach((i) => {
    try {
      const templateContent = readTemplateFile({
        targetPath: `${__dirname}${i.outPath}`,
        name: i.templateName
      })

      // 使用 art-template 渲染模板
      const generatedCode = generatedTemplateFile({
        templateContent: templateContent,
        data: i.dataSource
      })

      // 创建文件夹
      const outputDir = path.join(__dirname, `${i.targetPath}`);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 将生成的代码写入文件
      const outputPath = path.join(
        `${__dirname}${i.targetPath}`,// 生成路径
        `${[i.fileName]}${i.outSuffix}`);// 生成文件名

      fs.writeFileSync(outputPath, generatedCode, 'utf-8');

      console.log('前端代码已生成:', outputPath);
    } catch (error) {
      console.log('error: ', error);

    }
  })


  templatesService.forEach((i) => {
    try {
      const templateContent = readTemplateFile({
        targetPath: `${__dirname}${i.outPath}`,
        name: i.templateName
      })

      // 使用 art-template 渲染模板
      const generatedCode = generatedTemplateFile({
        templateContent: templateContent,
        data: i.dataSource
      })

      // 创建文件夹
      const outputDir = path.join(__dirname, `${i.targetPath}`);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 将生成的代码写入文件
      const outputPath = path.join(
        `${__dirname}${i.targetPath}`,// 生成路径
        `${[i.fileName]}${i.outSuffix}`);// 生成文件名

      fs.writeFileSync(outputPath, generatedCode, 'utf-8');

      console.log('后端代码已生成:', outputPath);
    } catch (error) {
      console.log('error: ', error);

    }
  })
}

processTemplates()