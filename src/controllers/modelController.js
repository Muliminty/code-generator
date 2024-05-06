const Model = require('../model/modelModel');
const ModuleProps = require('../model/modelPropsModel');
// import { processTemplates } = require('../utils/processTemplates');
const { processTemplates } = require('../utils/processTemplates');
const { compressFolder, getLocalIpAddress } = require('../utils/compressFolder');
const path = require('path');
const fs = require('fs');
const { templates, templatesService } = require('../config')
const modelController = {
  // 分页查询模块
  getModelsByPage: (req, res) => {
    try {
      // 从查询参数中获取页码和每页条目数量
      const page = Number(req.query.page) || 0;
      const pageSize = Number(req.query.pageSize) || 10;
      // 调用 Model 模型中的 getByPage 方法进行分页查询
      Model.getByPage(page, pageSize, (err, props) => {
        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          return res.status(500).json({ code: 'error', message: err.message });
        }

        // 构建返回数据格式
        const totalCount = props.totalCount; // 假设这里是获取总记录数的方法
        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = page;
        const data = {
          totalCount,
          currentPage,
          totalPages,
          pageSize,
          list: props.list
        };

        // 返回成功状态和数据
        res.json({ code: 'success', data, message: '成功' });
      });
    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      res.status(500).json({ code: 'error', message: error.message });
    }
  },

  // 获取所有模块
  getAllModels: (req, res) => {
    // 调用 Model 模型中的 getAll 方法从数据库中获取所有模块
    Model.getAll((err, models) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功获取模块，以 JSON 格式返回模块数据
      res.json(models);
    });
  },
  // 创建模块
  createModel: (req, res) => {
    // 从请求体中获取模块名和邮箱
    const { engName, remark, moduleId, } = req.query;

    // 调用 Model 模型中的 create 方法创建新模块
    Model.create(engName, remark, moduleId, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功创建模块，发送成功消息
      res.json({ code: 'success', data: {}, message: '成功' });
    });
  },
  // 更新模块信息
  updateModel: (req, res) => {

    try {
      // 获取要更新的模块的 ID
      const id = Number(req.params.id);

      // 从请求体中获取新的模块名和邮箱
      const { engName, remark, moduleId } = req.query;

      // 调用 Model 模型中的 update 方法更新模块信息
      Model.update(id, engName, remark, moduleId, (err) => {
        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          res.status(500).json({ error: err.message });
          return;
        }
        // 如果成功更新模块信息，发送成功消息
        res.json({ code: 'success', data: {}, message: '成功' });
      });
    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      res.status(500).json({ error: error.message });
    }
  },

  // 删除模块
  deleteModel: (req, res) => {
    // 获取要删除的模块的 ID
    const id = req.params.id;
    // 调用 Model 模型中的 delete 方法删除模块
    Model.delete(id, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功删除模块，发送成功消息
      res.json({ code: 'success', data: { deleteId: id }, message: '删除成功' });
    });
  },

  // 生成代码
  generateCode: async (req, res) => {
    try {
      // 获取要更新的模型属性的 ID
      const { id, engName, moduleName } = req.query;
      console.log('moduleName: ', moduleName);

      const props = await new Promise((resolve, reject) => {
        ModuleProps.getAllByModelId(Number(id), (err, props) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(props);
        });
      });

      const val = {
        "moduleName": moduleName, // 模块名
        "modelName": engName, // 模型名
        "tableName": `${engName}Table`, // 前端组件名
        "columns": JSON.stringify(props) // 将模型属性转换为 JSON 字符串
      };

      const delPath = path.resolve(__dirname, '..', '..', 'output');

      // 删除 output 文件夹
      fs.rm(delPath, { recursive: true, force: true }, async (err) => {
        if (err) {
          console.error('Error deleting folder:', err);
          res.status(500).json({ code: 'error', data: {}, message: 'Error deleting folder' });
          return;
        }

        // 调用异步函数 processTemplates，并等待其执行完成
        const focusPath = await processTemplates({
          dataSource: val,
          templates,
          templatesService,
        });

        const folderPath = `${focusPath}/output/template`; // 要压缩的文件夹路径
        const outputFileName = 'generated_code.zip'; // 指定文件名

        try {
          const outputFilePath = `${focusPath}/output/${outputFileName}`;
          await compressFolder({ folderPath, outputFilePath });
          const IP = getLocalIpAddress();
          res.json({ code: 'success', data: { IP, fileName: outputFileName }, message: 'Code generated successfully' });
        } catch (error) {
          console.log('error: ', error);
          res.status(500).json({ code: 'error', data: {}, message: error });
        }
      });

    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      console.error('generateCode error: ', error);
      res.status(500).json({ error: error.message });
    }
  }


};

module.exports = modelController;
