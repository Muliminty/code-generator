const fs = require('fs'); // 引入文件系统模块
const archiver = require('archiver'); // 引入压缩模块
const os = require('os');
const path = require('path');

// folderPath 要压缩的文件夹路径
// outputFilePath '/path/to/output.zip'; // 压缩文件的输出路径
const compressFolder = ({ folderPath, outputFilePath }) => {
  console.log('outputFilePath: ', outputFilePath);
  console.log('folderPath: ', folderPath);
  try {
    return new Promise((resolve, reject) => {
      const output = fs.createWriteStream(outputFilePath); // 创建一个写入流，指向输出文件路径

      const archive = archiver('zip', { zlib: { level: 9 } }); // 创建一个 archiver 实例，指定压缩格式为 zip，压缩级别为最高

      output.on('close', () => {
        console.log('压缩完成:', archive.pointer(), 'bytes'); // 输出压缩后的文件大小
        resolve(outputFilePath); // 压缩完成后，返回输出文件路径
      });

      archive.on('error', (err) => {
        reject(err); // 如果压缩过程中出现错误，则返回错误信息
      });

      archive.pipe(output); // 将输出流（写入流）与 archiver 实例进行连接

      archive.directory(folderPath, false); // 将文件夹中的所有内容添加到压缩文件中，第二个参数为 false 表示不包含文件夹本身

      archive.finalize(); // 完成压缩操作
    });
  } catch (error) {
    console.log('error: ', error);

  }
};



// 获取本地 IP 地址
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interface = interfaces[interfaceName];
    for (const item of interface) {
      if (item.family === 'IPv4' && !item.internal) {
        return item.address;
      }
    }
  }
  return '127.0.0.1';
}

const staticDir = () => {
  const IP = getLocalIpAddress()
  return path.join(IP, 'public'); // 假设静态目录为 'public'
}


module.exports = {
  compressFolder, staticDir, getLocalIpAddress
};
