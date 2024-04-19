const fs = require('fs');
const path = require('path');
const { readTemplateFile, generatedTemplateFile, } = require('./src/utils/renderTemplateFile')

const UserTable = require('./src/model/user.json');


const templateContent = readTemplateFile({
  targetPath: `${__dirname}/src/template/web`,
  name: 'proTable.txt'
})
// 使用 art-template 渲染模板
const generatedCode = generatedTemplateFile({
  templateContent: templateContent,
  data: UserTable
})

// 创建 output 文件夹（如果不存在）
const outputDir = path.join(__dirname, 'output/template');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 将生成的代码写入文件
const outputPath = path.join(outputDir, `${UserTable.tableName}.js`);
fs.writeFileSync(outputPath, generatedCode, 'utf-8');

console.log('代码已生成:', outputPath);