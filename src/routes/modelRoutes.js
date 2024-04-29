const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

router.get('/', modelController.getAllModels);
router.post('/', modelController.createModel);
router.put('/:id', modelController.updateModel);
router.delete('/:id', modelController.deleteModel);
router.get('/page', modelController.getModelsByPage); // 新增分页查询路由

router.post('/generate', modelController.generateCode); // 新增生成代码路由


module.exports = router;
