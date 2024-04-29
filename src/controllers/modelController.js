const Model = require('../model/modelModel');

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
    console.log('req.query: ', req.query);
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
    console.log('req: ', req);
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
  }
};

module.exports = modelController;
