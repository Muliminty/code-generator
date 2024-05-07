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

template.defaults.imports.style = style // 驼峰
template.defaults.imports.camel = camel // 驼峰
template.defaults.imports.pascal = pascal // 首字母大写
template.defaults.imports.hyphen = hyphen // 连字符
template.defaults.imports.constant = constant // 全部大写
template.defaults.imports.snake = snake   // 下划线
template.defaults.imports.underscore = underscore // 下划线
template.defaults.imports.toLowerCase = toLowerCase // 全部转小写


// {{tableName | style}}        camel
// {{tableName | camel}}        userTable
// {{tableName | pascal}}       UserTable
// {{tableName | hyphen}}       user-table
// {{tableName | constant}}     USER_TABLE
// {{tableName | snake}}        user_table
// {{tableName | underscore}}   user_table
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
        const fileName = `${toLowerCase(dataSource.modelName)}${[i.fileName]}${i.outSuffix}`; // 生成文件名
        // let templatePath = `${focusPath}${i.targetPath.replace(/\/web/, `/web${dataSource.modelName.toLowerCase()}`)}`
        let templatePath = `${focusPath}${i.targetPath.replace(/\/web/, `/Front/${dataSource.modelName.toLowerCase()}`)}`
        if (i.fileName === 'Table') {
          // templatePath = `${focusPath}${i.targetPath.replace(/\/modelName/, `/${dataSource.modelName.toLowerCase()}`)}`;
          templatePath = `${templatePath.replace(/\/modelName/, `/${dataSource.modelName.toLowerCase()}`)}`;
        }

        // 创建文件夹路径
        const outputDir = path.join(templatePath);

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
        // const outputDir = path.join(focusPath, `${ i.targetPath }`);
        await fs.mkdir(outputDir, { recursive: true });

        // 输出路径
        const outputPath = path.join(outputDir, fileName);

        // 将生成的代码写入文件
        // const outputPath = path.join(`${ focusPath }${ i.targetPath }`, fileName);

        await fs.writeFile(outputPath, generatedCode, 'utf-8');

        console.log('前端模板生成成功');

      } catch (error) {
        console.log('前端模板生成失败 error: ', error);
      }
    }

    for (const i of templatesService) {
      try {
        const fileName = `${pascal(dataSource.modelName)}${[i.fileName]}${i.outSuffix}`; // 生成文件名

        const templatePath = `${focusPath}${i.targetPath.replace(/\/service/, `/Back/${dataSource.moduleName}/${dataSource.modelName.toLowerCase()}`)}`;

        // 创建文件夹路径
        const outputDir = path.join(templatePath);

        // 创建文件夹
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
        console.log('后端模板生成成功');
      } catch (error) {
        console.log('后端模板生成失败 error: ', error);
      }
    }

    return focusPath
  } catch (error) {
    console.error('处理模板时出错:', error);
    throw error;
  }
};

exports.processTemplates = processTemplates;
