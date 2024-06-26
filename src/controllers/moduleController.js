const Module = require('../model/moduleModel');
const Model = require('../model/modelModel');
const moduleController = {
  // 分页查询模块
  getModulesByPage: (req, res) => {
    try {
      // 从查询参数中获取页码和每页条目数量
      const page = Number(req.query.page) || 0;
      const pageSize = Number(req.query.pageSize) || 10;
      // 调用 Model 模型中的 getByPage 方法进行分页查询
      Module.getByPage({ page, pageSize, ...req.query }, (err, props) => {
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
  getAllModules: (req, res) => {
    // 调用 Module 模型中的 getAll 方法从数据库中获取所有模块
    Module.getAll((err, modules) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功获取模块，以 JSON 格式返回模块数据
      res.json(modules);
    });
  },
  // 创建模块
  createModule: (req, res) => {
    // 从请求体中获取模块名和邮箱
    const { code, name } = req.query;
    console.log('req.query: ', req.query);
    // 调用 Module 模型中的 create 方法创建新模块
    Module.create(code, name, (err) => {
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
  updateModule: (req, res) => {

    try {
      // 获取要更新的模块的 ID
      const id = Number(req.params.id);

      // 从请求体中获取新的模块名和邮箱
      const { code, name, sortNum, } = req.query;

      // 调用 Module 模型中的 update 方法更新模块信息
      Module.update(id, code, name, sortNum, (err) => {
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
  deleteModule: (req, res) => {
    // 获取要删除的模块的 ID
    const id = req.params.id;
    let totalCount = 0
    Model.getByPage(1, 100, { moduleId: id }, (err, props) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        return res.status(500).json({ code: 'error', message: err.message });
      }
      // 构建返回数据格式
      totalCount = props.list.length; // 假设这里是获取总记录数的方法

      if (totalCount > 0) {
        return res.status(500).json({ code: 'error', message: '请先删除该模块下的所有模型' });
      }
      // 调用 Module 模型中的 delete 方法删除模块
      Module.delete(id, (err) => {

        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          res.status(500).json({ error: err.message });
          return;
        }
        // 如果成功删除模块，发送成功消息
        res.json({ code: 'success', data: {}, message: '成功' });
      });
    })

  }
};

module.exports = moduleController;
