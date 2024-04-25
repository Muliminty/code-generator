
// 默认每页显示的条目数量
const DEFAULT_PAGE_SIZE = 10;

// 分页中间件函数，接收请求、响应和下一个中间件函数作为参数
function paginationMiddleware(req, res, next) {
  // 解析请求中的页码参数，如果未提供则默认为第一页
  const page = parseInt(req.query.page) || 1;

  // 解析请求中的每页条目数量参数，如果未提供则使用默认值
  const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;

  // 计算查询偏移量，用于数据库查询
  const offset = (page - 1) * pageSize;

  // 将分页参数添加到请求对象中，以便后续中间件或路由处理程序使用
  req.pagination = {
    page,
    pageSize,
    offset
  };

  // 调用下一个中间件或路由处理程序
  next();
}

module.exports = paginationMiddleware;
