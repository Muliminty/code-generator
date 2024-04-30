const fs = require('fs').promises;
const path = require('path');
const { readTemplateFile, generatedTemplateFile } = require('./renderTemplateFile');
const {
  style,
  camel,
  pascal,
  hyphen,
  constant,
  snake,
  underscore,
} = require('naming-style');

const template = require('art-template');

const toLowerCase = str => str.toLowerCase();

template.defaults.imports.style = style
template.defaults.imports.camel = camel
template.defaults.imports.pascal = pascal
template.defaults.imports.hyphen = hyphen
template.defaults.imports.constant = constant
template.defaults.imports.snake = snake
template.defaults.imports.underscore = underscore
template.defaults.imports.toLowerCase = toLowerCase

template.defaults.debug = true;

const processTemplates = async ({
  dataSource,
  templates,
  templatesService,
  focusPath = path.resolve(__dirname, '..', '..')
}) => {
  dataSource.columns = JSON.parse(dataSource.columns);

  try {
    for (const i of templates) {
      try {
        const templateContent = readTemplateFile({
          targetPath: `${focusPath}${i.outPath}`,
          name: i.templateName
        });

        // 使用 art-template 渲染模板
        const generatedCode = generatedTemplateFile({
          templateContent: templateContent,
          data: dataSource
        });

        // 创建文件夹
        const outputDir = path.join(focusPath, `${i.targetPath}`);
        await fs.mkdir(outputDir, { recursive: true });

        // 将生成的代码写入文件
        const outputPath = path.join(
          `${focusPath}${i.targetPath}`,
          `${[i.fileName]}${i.outSuffix}`); // 生成文件名

        await fs.writeFile(outputPath, generatedCode, 'utf-8');

        console.log('前端模板生成成功');

      } catch (error) {
        console.log('前端模板生成失败 error: ', error);
      }
    }

    for (const i of templatesService) {
      try {
        const fileName = `${pascal(dataSource.modelName)}${[i.fileName]}${i.outSuffix}`; // 生成文件名

        const templatePath = `${focusPath}${i.targetPath.replace(/\/service/, `/${dataSource.moduleName}/${dataSource.modelName.toLowerCase()}`)}`;

        // 创建文件夹路径
        const outputDir = path.join(templatePath);

        // 在sso创建文件夹
        await fs.mkdir(outputDir, { recursive: true });

        // 读取模板文件
        const templateContent = readTemplateFile({
          targetPath: `${focusPath}${i.outPath}`,
          name: i.templateName
        });

        // 使用 art-template 渲染模板
        const generatedCode = generatedTemplateFile({
          templateContent: templateContent,
          data: {
            dataSource: dataSource,
            config: templatesService
          }
        });

        // 输出路径
        const outputPath = path.join(outputDir, fileName);

        await fs.writeFile(outputPath, generatedCode, 'utf-8');

      } catch (error) {
        console.log('error: ', error);
      }
    }

    return focusPath
  } catch (error) {
    console.error('处理模板时出错:', error);
    throw error;
  }
};

exports.processTemplates = processTemplates;
