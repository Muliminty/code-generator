const fs = require('fs');
const path = require('path');
const { readTemplateFile, generatedTemplateFile, } = require('./src/utils/renderTemplateFile')
const { templates, templatesService } = require('./src/config')
const {
  style,
  camel,
  pascal,
  hyphen,
  constant,
  snake,
  underscore,
} = require('naming-style')
const template = require('art-template');

template.defaults.imports.style = style
template.defaults.imports.camel = camel
template.defaults.imports.pascal = pascal
template.defaults.imports.hyphen = hyphen
template.defaults.imports.constant = constant
template.defaults.imports.snake = snake
template.defaults.imports.underscore = underscore


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
      const fileName = `${pascal(i.dataSource.modelName)}${[i.fileName]}${i.outSuffix}`// 生成文件名
      // 生成到当前项目 路径
      const templatePath = `${__dirname}${i.targetPath}/${pascal(i.dataSource.modelName)}${[i.fileName]}`

      // 创建文件夹路径
      const outputDir = path.join(ssoPath);

      // 读取模板文件
      const templateContent = readTemplateFile({
        targetPath: `${__dirname}${i.outPath}`,
        name: i.templateName
      })

      // 使用 art-template 渲染模板
      const generatedCode = generatedTemplateFile({
        templateContent: templateContent,
        data: {
          dataSource: i.dataSource,
          config: templatesService
        }
      })

      // 创建文件夹
      // const outputDir = path.join(__dirname, `${i.targetPath}`);

      // 在sso创建文件夹
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // 输出路径
      const outputPath = path.join(outputDir, fileName)

      fs.writeFileSync(outputPath, generatedCode, 'utf-8');
      console.log('后端代码已生成:', outputPath);

    } catch (error) {
      console.log('error: ', error);

    }
  })
}

processTemplates()