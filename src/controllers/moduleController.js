const Module = require('../model/moduleModel');

const moduleController = {
  // 分页查询模块
  getModulesByPage: (req, res) => {
    try {
      console.log('req: ', req);
      // 从查询参数中获取页码和每页条目数量
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);

      // 调用 Module 模型中的 getByPage 方法进行分页查询
      Module.getByPage(page, pageSize, (err, modules) => {
        if (err) {
          // 如果出现错误，返回 500 状态码并发送错误消息
          res.status(500).json({ error: err.message });
          return;
        }
        // 如果成功获取模块，以 JSON 格式返回模块数据
        res.json(modules);
      });
    } catch (error) {
      // 捕获其他未处理的错误并返回 500 状态码
      res.status(500).json({ error: error.message });
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
    // 调用 Module 模型中的 create 方法创建新模块
    Module.create(code, name, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功创建模块，发送成功消息
      res.send('Module created successfully');
    });
  },
  // 更新模块信息
  updateModule: (req, res) => {
    console.log('req: ', req);
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
        res.send('Module updated successfully');
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
    // 调用 Module 模型中的 delete 方法删除模块
    Module.delete(id, (err) => {
      if (err) {
        // 如果出现错误，返回 500 状态码并发送错误消息
        res.status(500).json({ error: err.message });
        return;
      }
      // 如果成功删除模块，发送成功消息
      res.send('Module deleted successfully');
    });
  }
};

module.exports = moduleController;
