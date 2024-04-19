// const fs = require('fs');
// const path = require('path');
// const zlib = require('zlib');


// const compressTemplate = () => {
//   const folderToCompress = path.join(__dirname, '..', '..', 'output/template');
//   const compressedFilePath = path.join(__dirname, '..', '..', 'output/output.zip');

//   const compressedStream = fs.createWriteStream(compressedFilePath);
//   const gzip = zlib.createGzip();

//   compressedStream.on('close', () => {
//     console.log('压缩文件已生成:', compressedFilePath);
//     // 压缩完成后删除生成的模板
//     deleteTemplateFolder(folderToCompress);
//   });

//   const compressFolderRecursive = (folderPath, parentPath) => {
//     fs.readdir(folderPath, (err, files) => {
//       if (err) {
//         console.error('读取文件夹失败:', err);
//         return;
//       }

//       files.forEach(file => {
//         const filePath = path.join(folderPath, file);
//         const relativePath = path.join(parentPath || '', file);
//         fs.stat(filePath, (err, stats) => {
//           if (err) {
//             console.error('获取文件状态失败:', err);
//             return;
//           }

//           if (stats.isDirectory()) {
//             compressFolderRecursive(filePath, relativePath);
//           } else {
//             const readStream = fs.createReadStream(filePath);
//             gzip.on('error', err => {
//               console.error('压缩错误:', err);
//             });
//             readStream.pipe(gzip).pipe(compressedStream, { end: false });
//           }
//         });
//       });
//     });
//   };

//   compressFolderRecursive(folderToCompress);
// };

// const deleteTemplateFolder = (folderPath) => {
//   fs.rmdir(folderPath, { recursive: true }, err => {
//     if (err) {
//       console.error('删除文件夹失败:', err);
//     }
//   });
// };

// module.exports = {
//   compressTemplate
// };
