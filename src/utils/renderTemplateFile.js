const fs = require('fs');
const path = require('path');
const template = require('art-template');

// 读取目标数据
const readTemplateFile = ({ targetPath, name, Unicode = 'utf-8' }) => {
  try {
    const templatePath = path.join(targetPath, name);
    const templateContent = fs.readFileSync(templatePath, Unicode);
    return templateContent
  } catch (error) {
    console.log('readTemplateFile error: ', error);
    return '文件读取失败'
  }
}

// 渲染模板文件
const generatedTemplateFile = ({ templateContent, data }) => {
  try {
    const generatedCode = template.render(templateContent, data);
    return generatedCode
  } catch (error) {
    console.log('error: ', error);

  }
}

// 生成目录结构
const generateProjectStructure = () => { }



module.exports = {
  readTemplateFile, generatedTemplateFile, generateProjectStructure
};
