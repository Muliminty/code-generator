const fs = require('fs');
const path = require('path');
const template = require('art-template');


const UserTable = require('./src/model/user.json');

// 数据模型

// 读取模板文件
const templatePath = path.join(`${__dirname}/src/template/web`, 'proTable.txt');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

// 使用 art-template 渲染模板
const generatedCode = template.render(templateContent, UserTable);

// 创建 output 文件夹（如果不存在）
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 将生成的代码写入文件
const outputPath = path.join(outputDir, `${UserTable.tableName}.js`);
fs.writeFileSync(outputPath, generatedCode, 'utf-8');

console.log('代码已生成:', outputPath);
